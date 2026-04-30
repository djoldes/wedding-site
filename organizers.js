document.addEventListener('DOMContentLoaded', function () {
    const adminCode = 'salomeea2026';
    const adminGate = document.getElementById('adminGate');
    const adminPanel = document.getElementById('adminPanel');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminCodeInput = document.getElementById('adminCodeInput');
    const adminGateMessage = document.getElementById('adminGateMessage');
    const adminTabButtons = document.querySelectorAll('.admin-tab-button');
    const adminTabPanes = document.querySelectorAll('.admin-tab-pane');
    const guestSearchInput = document.getElementById('guestSearchInput');
    const searchGuestButton = document.getElementById('searchGuestButton');
    const clearGuestFilterButton = document.getElementById('clearGuestFilterButton');
    const guestSuggestions = document.getElementById('guestSuggestions');
    const guestResult = document.getElementById('guestResult');
    const addGuestForm = document.getElementById('addGuestForm');
    const newGuestNameInput = document.getElementById('newGuestNameInput');
    const newGuestTableSelect = document.getElementById('newGuestTableSelect');
    const addGuestMessage = document.getElementById('addGuestMessage');
    const addTableForm = document.getElementById('addTableForm');
    const newTableNumberInput = document.getElementById('newTableNumberInput');
    const newTableLabelInput = document.getElementById('newTableLabelInput');
    const addTableMessage = document.getElementById('addTableMessage');
    const tableGrid = document.getElementById('tableGrid');
    const tableDetail = document.getElementById('tableDetail');
    const totalGuests = document.getElementById('totalGuests');
    const totalTables = document.getElementById('totalTables');
    const largestTable = document.getElementById('largestTable');

    const assignmentStorageKey = 'organizerGuestAssignments';
    let selectedTable = null;
    let guestAssignments = loadGuestAssignments();
    let activeGuest = null;
    let pendingTable = null;
    let adminActiveTab = 'search';

    function openAdminPanel() {
        adminGate.hidden = true;
        adminPanel.hidden = false;
        renderAdminTab('search');
    }

    function showAdminError() {
        adminGateMessage.textContent = 'Cod incorect. Încearcă din nou.';
        adminCodeInput.value = '';
        adminCodeInput.focus();
    }

    if (sessionStorage.getItem('organizerAdminUnlocked') === 'true') {
        openAdminPanel();
    }

    adminLoginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (adminCodeInput.value.trim() === adminCode) {
            sessionStorage.setItem('organizerAdminUnlocked', 'true');
            adminGateMessage.textContent = '';
            openAdminPanel();
            return;
        }

        showAdminError();
    });

    function normalizeText(value) {
        return String(value ?? '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function setFormMessage(element, message, isError = false) {
        if (!element) {
            return;
        }

        element.textContent = message || '';
        element.classList.toggle('is-error', Boolean(isError));
    }

    function loadGuestAssignments() {
        try {
            const stored = JSON.parse(localStorage.getItem(assignmentStorageKey) || '{}');
            return invitati.map(guest => ({
                ...guest,
                masa: Number(stored[guest.nume] ?? guest.masa)
            }));
        } catch {
            return invitati.map(guest => ({ ...guest }));
        }
    }

    function saveGuestAssignments() {
        const payload = Object.fromEntries(guestAssignments.map(guest => [guest.nume, guest.masa]));
        saveWeddingGuests(guestAssignments);
    }

    function getTableNumbers() {
        const configuredTables = guestExperienceData?.tableZones?.flatMap(zone => zone.tables) || [];
        return [...new Set(configuredTables)].sort((a, b) => a - b);
    }

    function getTableLabel(tableNumber) {
        const numericTable = Number(tableNumber);
        const zone = guestExperienceData?.tableZones?.find(item => item.tables.includes(numericTable));
        return zone?.label || `Masa ${numericTable}`;
    }

    function getTableOptionsMarkup(selectedValue) {
        return getTableNumbers()
            .map(table => `<option value="${table}" ${Number(selectedValue) === table ? 'selected' : ''}>Masa ${table} - ${getTableLabel(table)}</option>`)
            .join('');
    }

    function refreshTableSelects() {
        if (newGuestTableSelect) {
            newGuestTableSelect.innerHTML = getTableOptionsMarkup(newGuestTableSelect.value || getTableNumbers()[0] || '');
        }
    }

    function renderAdminTab(tabName) {
        adminActiveTab = tabName;

        adminTabButtons.forEach(button => {
            button.classList.toggle('is-active', button.dataset.adminTab === tabName);
        });

        adminTabPanes.forEach(pane => {
            pane.classList.toggle('is-active', pane.dataset.adminTab === tabName);
        });

        if (tabName === 'tables') {
            renderDashboard();
        }

        if (tabName === 'add-guest') {
            refreshTableSelects();
        }
    }

    function getOccupiedTableNumbers() {
        return [...new Set(guestAssignments.map(guest => guest.masa))].sort((a, b) => a - b);
    }

    function getGuestsForTable(tableNumber) {
        return guestAssignments.filter(guest => guest.masa === tableNumber);
    }

    function getGuestByName(name) {
        return guestAssignments.find(guest => normalizeText(guest.nume) === normalizeText(name)) || null;
    }

    function updateStats() {
        const tableNumbers = getTableNumbers();
        totalGuests.textContent = guestAssignments.length;
        totalTables.textContent = tableNumbers.length;
        largestTable.textContent = tableNumbers.length
            ? Math.max(...tableNumbers.map(table => getGuestsForTable(table).length))
            : 0;
    }

    function clearSuggestions() {
        guestSuggestions.innerHTML = '';
        guestSuggestions.classList.remove('show');
    }

    function renderSuggestions(input) {
        const query = normalizeText(input);

        if (!query) {
            clearSuggestions();
            return;
        }

        const matches = guestAssignments
            .map(guest => ({
                ...guest,
                normalizedName: normalizeText(guest.nume)
            }))
            .filter(guest => guest.normalizedName.includes(query) || guest.normalizedName.startsWith(query))
            .sort((a, b) => a.nume.localeCompare(b.nume, 'ro'))
            .slice(0, 5);

        if (!matches.length) {
            guestSuggestions.innerHTML = '<div class="suggestions__empty">Niciun nume similar găsit</div>';
            guestSuggestions.classList.add('show');
            return;
        }

        guestSuggestions.innerHTML = matches
            .map(guest => `
                <button type="button" class="suggestion-chip" data-name="${escapeHtml(guest.nume)}">
                    <span class="suggestion-chip__name">${escapeHtml(guest.nume)}</span>
                </button>
            `)
            .join('');
        guestSuggestions.classList.add('show');

        guestSuggestions.querySelectorAll('.suggestion-chip').forEach(button => {
            button.addEventListener('click', function () {
                guestSearchInput.value = this.dataset.name || '';
                clearSuggestions();
                searchGuest();
            });
        });
    }

    function clearResult() {
        guestResult.classList.remove('show', 'success', 'error');
        guestResult.innerHTML = '';
    }

    function showError(message) {
        clearResult();
        guestResult.classList.add('error', 'show');
        guestResult.innerHTML = `<div class="result-message">${escapeHtml(message)}</div>`;
    }

    function openGuestEditor(guest) {
        activeGuest = guest;
        pendingTable = guest.masa;

        const tableOptions = getTableNumbers();

        clearResult();
        guestResult.classList.add('success', 'show');
        guestResult.innerHTML = `
            <div class="guest-card guest-card--editor">
                <div class="guest-card__ornament guest-card__ornament--left"></div>
                <div class="guest-card__ornament guest-card__ornament--right"></div>
                <div class="guest-card__shine"></div>
                <div class="guest-card__eyebrow">🔐 Modificare organizator</div>
                <div class="guest-card__label">Nume (editabil)</div>
                <input type="text" id="pendingGuestName" class="guest-card__name-input" value="${escapeHtml(guest.nume)}" placeholder="Introdu numele invitatului">
                <div class="guest-card__text">Editează numele și masa, apoi apasă Save.</div>
                <div class="guest-card__label">Masa curentă</div>
                <div class="guest-card__table-wrap">
                    <div class="guest-card__table-label">Masa actuală</div>
                    <div class="guest-card__table" id="currentGuestTable">${escapeHtml(guest.masa)}</div>
                </div>
                <div class="guest-card__label">Masa nouă</div>
                <div class="guest-card__editor-row">
                    <select id="pendingTableSelect" class="guest-card__table-select">
                        ${tableOptions.map(table => `<option value="${table}" ${table === guest.masa ? 'selected' : ''}>Masa ${table} - ${getTableLabel(table)}</option>`).join('')}
                    </select>
                </div>
                <div class="guest-card__actions">
                    <button type="button" id="saveGuestTableButton">Save</button>
                    <button type="button" id="deleteGuestButton" class="secondary danger">Șterge</button>
                    <button type="button" id="cancelGuestEditButton" class="secondary">Anulează</button>
                </div>
                <div class="guest-card__hint" id="guestEditHint">Nu s-a salvat încă nimic.</div>
            </div>
        `;

        const pendingGuestName = document.getElementById('pendingGuestName');
        const pendingTableSelect = document.getElementById('pendingTableSelect');
        const saveGuestTableButton = document.getElementById('saveGuestTableButton');
        const deleteGuestButton = document.getElementById('deleteGuestButton');
        const cancelGuestEditButton = document.getElementById('cancelGuestEditButton');
        const guestEditHint = document.getElementById('guestEditHint');

        pendingTableSelect.addEventListener('change', function () {
            pendingTable = Number(this.value);
            guestEditHint.textContent = `Masa selectată: ${pendingTable}. Apasă Save pentru a salva.`;
        });

        saveGuestTableButton.addEventListener('click', function () {
            if (!activeGuest) {
                return;
            }

            const newName = pendingGuestName.value.trim();
            if (!newName) {
                showError('Numele nu poate fi gol.');
                return;
            }

            const actualIndex = guestAssignments.findIndex(guest => normalizeText(guest.nume) === normalizeText(activeGuest.nume));
            if (actualIndex === -1) {
                showError('Invitatul nu a fost găsit în lista internă.');
                return;
            }

            // Check if new name already exists (excluding current guest)
            if (newName !== activeGuest.nume && guestAssignments.some((guest, idx) => normalizeText(guest.nume) === normalizeText(newName) && idx !== actualIndex)) {
                showError('Un invitat cu acest nume există deja.');
                return;
            }

            guestAssignments[actualIndex].nume = newName;
            guestAssignments[actualIndex].masa = Number(pendingTable);
            saveGuestAssignments();
            activeGuest = guestAssignments[actualIndex];
            pendingTable = activeGuest.masa;
            renderDashboard();
            openGuestEditor(activeGuest);
            guestEditHint.textContent = 'Schimbarea a fost salvată.';
        });

        deleteGuestButton.addEventListener('click', function () {
            if (!activeGuest) {
                return;
            }

            if (confirm(`Sigur vrei să ștergi invitatul "${activeGuest.nume}"?`)) {
                deleteGuest(activeGuest.nume);
            }
        });

        cancelGuestEditButton.addEventListener('click', function () {
            if (activeGuest) {
                openGuestEditor(activeGuest);
            }
        });
    }

    function renderAmbiguousCard(query, results) {
        const preview = results
            .slice(0, 3)
            .map(guest => `<li>${escapeHtml(guest.nume)}</li>`)
            .join('');

        const extraCount = results.length - Math.min(results.length, 3);

        clearResult();
        guestResult.classList.add('error', 'show');
        guestResult.innerHTML = `
            <div class="guest-card guest-card--ambiguous">
                <div class="guest-card__ornament guest-card__ornament--left"></div>
                <div class="guest-card__ornament guest-card__ornament--right"></div>
                <div class="guest-card__eyebrow">⚠️ Mai multe potriviri</div>
                <div class="guest-card__name">${escapeHtml(query)}</div>
                <div class="guest-card__text">Am găsit mai mulți invitați cu nume similar. Alege unul ca să continui editarea.</div>
                <ul class="guest-card__list">
                    ${preview}
                    ${extraCount > 0 ? `<li>și încă ${extraCount} invitați</li>` : ''}
                </ul>
                <div class="guest-card__actions">
                    ${results.slice(0, 5).map(guest => `<button type="button" class="secondary guest-card__choice" data-guest-name="${escapeHtml(guest.nume)}">${escapeHtml(guest.nume)}</button>`).join('')}
                </div>
            </div>
        `;

        guestResult.querySelectorAll('.guest-card__choice').forEach(button => {
            button.addEventListener('click', function () {
                const guest = getGuestByName(this.dataset.guestName);
                if (guest) {
                    guestSearchInput.value = guest.nume;
                    clearSuggestions();
                    openGuestEditor(guest);
                }
            });
        });
    }

    function deleteGuest(name) {
        const actualIndex = guestAssignments.findIndex(guest => normalizeText(guest.nume) === normalizeText(name));
        if (actualIndex === -1) {
            showError('Invitatul nu a fost găsit.');
            return;
        }

        guestAssignments.splice(actualIndex, 1);
        saveGuestAssignments();
        activeGuest = null;
        pendingTable = null;
        guestSearchInput.value = '';
        clearSuggestions();
        clearResult();
        renderDashboard();
        setFormMessage(guestResult, `Invitatul a fost șters cu succes.`);
        guestResult.classList.add('success', 'show');
    }

    function searchGuest() {
        const input = guestSearchInput.value.trim();

        if (!input) {
            showError('Te rog introdu un nume.');
            return;
        }

        const searchWords = normalizeText(input).split(/\s+/).filter(Boolean);
        const normalizedInput = normalizeText(input);

        const results = guestAssignments
            .map(guest => {
                const normalizedName = normalizeText(guest.nume);
                const nameWords = normalizedName.split(/\s+/).filter(Boolean);
                const matches = searchWords.every(searchWord =>
                    nameWords.some(nameWord => nameWord.startsWith(searchWord))
                );

                return {
                    ...guest,
                    normalizedName,
                    matches,
                    exact: normalizedName === normalizedInput
                };
            })
            .filter(guest => guest.matches)
            .sort((a, b) => {
                if (a.exact !== b.exact) {
                    return a.exact ? -1 : 1;
                }
                return a.nume.localeCompare(b.nume, 'ro');
            });

        clearSuggestions();

        if (!results.length) {
            showError(`Numele "${input}" nu a fost găsit.`);
            return;
        }

        const exactMatch = results.find(guest => guest.exact);

        if (exactMatch) {
            openGuestEditor(getGuestByName(exactMatch.nume) || exactMatch);
            return;
        }

        if (results.length === 1) {
            openGuestEditor(getGuestByName(results[0].nume) || results[0]);
            return;
        }

        renderAmbiguousCard(input, results);
    }

    function renderTableGrid() {
        const tableNumbers = getTableNumbers();

        tableGrid.innerHTML = tableNumbers.map(tableNumber => {
            const count = getGuestsForTable(tableNumber).length;
            return `
                <button type="button" class="table-card ${selectedTable === tableNumber ? 'is-active' : ''}" data-table-number="${tableNumber}">
                    <span class="table-card__number">${tableNumber}</span>
                    <span class="table-card__count">${getTableLabel(tableNumber)}</span>
                    <span class="table-card__count">${count} invitați</span>
                </button>
            `;
        }).join('');

        tableGrid.querySelectorAll('.table-card').forEach(card => {
            card.addEventListener('click', function () {
                selectedTable = Number(this.dataset.tableNumber);
                renderDashboard();
            });
        });
    }

    function deleteTable(tableNumber) {
        const occupiedTables = getOccupiedTableNumbers();
        if (occupiedTables.includes(tableNumber)) {
            const guestCount = getGuestsForTable(tableNumber).length;
            if (!confirm(`Această masă are ${guestCount} invitați. Sigur vrei să o ștergi?`)) {
                return;
            }
        }

        const zones = Array.isArray(guestExperienceData.tableZones) ? [...guestExperienceData.tableZones] : [];
        const updatedZones = zones.filter(zone => {
            if (Array.isArray(zone.tables)) {
                zone.tables = zone.tables.filter(table => table !== tableNumber);
                return zone.tables.length > 0;
            }
            return true;
        });

        guestExperienceData.tableZones = updatedZones;
        saveWeddingTableZones(guestExperienceData.tableZones);
        selectedTable = null;
        renderDashboard();
    }

    function renderTableDetail() {
        if (selectedTable === null) {
            const tableNumbers = getTableNumbers();
            selectedTable = tableNumbers[0] || null;
        }

        if (selectedTable === null) {
            tableDetail.innerHTML = '<div class="table-detail__empty">Nu există mese configurate.</div>';
            return;
        }

        const guests = getGuestsForTable(selectedTable);

        tableDetail.innerHTML = `
            <div class="table-detail__title">Masa ${selectedTable}</div>
            ${guests.length
                ? `<div class="table-detail__list">${guests.map(guest => `<span class="table-detail__pill">${guest.nume}</span>`).join('')}</div>`
                : '<div class="table-detail__empty">Nu este atribuit nimeni acestei mese.</div>'}
            <div class="table-detail__actions">
                <button type="button" id="deleteTableButton" class="secondary danger">Șterge masa</button>
            </div>
        `;

        const deleteTableButton = document.getElementById('deleteTableButton');
        if (deleteTableButton) {
            deleteTableButton.addEventListener('click', function () {
                if (selectedTable !== null) {
                    deleteTable(selectedTable);
                }
            });
        }
    }

    function renderDashboard() {
        updateStats();
        refreshTableSelects();
        renderTableGrid();
        renderTableDetail();
    }

    function addGuest() {
        const name = newGuestNameInput.value.trim();
        const tableNumber = Number(newGuestTableSelect.value);

        if (!name) {
            setFormMessage(addGuestMessage, 'Introdu numele invitatului.', true);
            return;
        }

        if (guestAssignments.some(guest => normalizeText(guest.nume) === normalizeText(name))) {
            setFormMessage(addGuestMessage, 'Există deja un invitat cu acest nume.', true);
            return;
        }

        if (!getTableNumbers().includes(tableNumber)) {
            setFormMessage(addGuestMessage, 'Alege o masă validă.', true);
            return;
        }

        guestAssignments = [...guestAssignments, { nume: name, masa: tableNumber }];
        saveGuestAssignments();
        newGuestNameInput.value = '';
        setFormMessage(addGuestMessage, `Invitatul ${name} a fost adăugat la masa ${tableNumber}.`);
        renderDashboard();
    }

    function addTable() {
        const tableNumber = Number(newTableNumberInput.value);
        const tableLabel = newTableLabelInput.value.trim() || `Masa ${tableNumber}`;

        if (!tableNumber || tableNumber < 1) {
            setFormMessage(addTableMessage, 'Introdu un număr de masă valid.', true);
            return;
        }

        if (getTableNumbers().includes(tableNumber)) {
            setFormMessage(addTableMessage, 'Masa există deja.', true);
            return;
        }

        const zones = Array.isArray(guestExperienceData.tableZones) ? [...guestExperienceData.tableZones] : [];
        zones.push({
            id: `custom-${tableNumber}`,
            label: tableLabel,
            tables: [tableNumber]
        });

        guestExperienceData.tableZones = zones.sort((a, b) => a.tables[0] - b.tables[0]);
        saveWeddingTableZones(guestExperienceData.tableZones);
        newTableNumberInput.value = '';
        newTableLabelInput.value = '';
        setFormMessage(addTableMessage, `Masa ${tableNumber} a fost adăugată.`);
        refreshTableSelects();
        renderDashboard();
    }

    guestSearchInput?.addEventListener('input', function () {
        renderSuggestions(this.value);
    });

    clearGuestFilterButton?.addEventListener('click', function () {
        guestSearchInput.value = '';
        clearSuggestions();
        clearResult();
        activeGuest = null;
        pendingTable = null;
        guestSearchInput.focus();
    });

    searchGuestButton?.addEventListener('click', function () {
        searchGuest();
    });

    guestSearchInput?.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchGuest();
        }
    });

    adminTabButtons.forEach(button => {
        button.addEventListener('click', function () {
            renderAdminTab(this.dataset.adminTab || 'search');
        });
    });

    addGuestForm?.addEventListener('submit', function (event) {
        event.preventDefault();
        addGuest();
    });

    addTableForm?.addEventListener('submit', function (event) {
        event.preventDefault();
        addTable();
    });

    if (newGuestTableSelect) {
        newGuestTableSelect.innerHTML = getTableOptionsMarkup(getTableNumbers()[0] || '');
    }

    renderDashboard();
});