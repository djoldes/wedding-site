const nameInput = document.getElementById('nameInput');
const resultDiv = document.getElementById('result');
const searchButton = document.getElementById('searchButton');
const resetButton = document.getElementById('resetButton');
const suggestionsDiv = document.getElementById('suggestions');
const programContent = document.getElementById('programContent');
const menuContent = document.getElementById('menuContent');

// Gallery
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxOverlay = document.getElementById('lightboxOverlay');

let currentGalleryImages = [];
let currentLightboxIndex = 0;

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

function getFirstName(fullName) {
    return String(fullName || '').trim().split(/\s+/)[0] || '';
}

function getTableCompanions(invitat) {
    const seen = new Set();

    return invitati
        .filter(item => item.masa === invitat.masa && normalizeText(item.nume) !== normalizeText(invitat.nume))
        .map(item => getFirstName(item.nume))
        .filter(name => {
            const normalized = normalizeText(name);
            if (!normalized || seen.has(normalized)) {
                return false;
            }
            seen.add(normalized);
            return true;
        });
}

function getTableZone(tableNumber) {
    const numericTable = Number(tableNumber);
    const zones = guestExperienceData?.tableZones || [];
    return zones.find(zone => zone.tables.includes(numericTable)) || null;
}

function formatZoneTables(tables) {
    if (!tables.length) {
        return '';
    }

    if (tables.length === 1) {
        return `Masa ${tables[0]}`;
    }

    return `Mese ${tables[0]}-${tables[tables.length - 1]}`;
}

function renderTimelineMarkup() {
    const timeline = guestExperienceData?.timeline || [];

    if (!timeline.length) {
        return '';
    }

    const first = timeline[0];
    const stepsMarkup = timeline
        .map((item, index) => `
            <button
                type="button"
                class="timeline-step ${index === 0 ? 'is-active' : ''}"
                data-timeline-index="${index}"
            >
                <span class="timeline-step__time">${escapeHtml(item.time)}</span>
                <span class="timeline-step__title">${escapeHtml(item.title)}</span>
            </button>
        `)
        .join('');

    return `
        <section class="guest-feature">
            <h3 class="guest-feature__title">Programul serii</h3>
            <div class="timeline-steps">${stepsMarkup}</div>
            <div class="timeline-detail">
                <div class="timeline-detail__time">${escapeHtml(first.time)}</div>
                <div class="timeline-detail__title">${escapeHtml(first.title)}</div>
                <div class="timeline-detail__text">${escapeHtml(first.description)}</div>
            </div>
        </section>
    `;
}

function renderMiniMapMarkup(invitat) {
    const zones = guestExperienceData?.tableZones || [];

    if (!zones.length) {
        return '';
    }

    const activeZone = getTableZone(invitat.masa);
    const zonesMarkup = zones
        .map(zone => `
            <div class="mini-map__zone ${activeZone?.id === zone.id ? 'is-active' : ''}">
                <div class="mini-map__zone-title">${escapeHtml(zone.label)}</div>
                <div class="mini-map__zone-tables">${escapeHtml(formatZoneTables(zone.tables))}</div>
            </div>
        `)
        .join('');

    return `
        <section class="guest-feature">
            <h3 class="guest-feature__title">Harta rapidă a sălii</h3>
            <div class="mini-map">${zonesMarkup}</div>
            <div class="mini-map__hint">
                ${activeZone
                    ? `Masa ta este în ${escapeHtml(activeZone.label)}.`
                    : 'Masa ta este evidențiată în hartă.'}
            </div>
        </section>
    `;
}

function renderCompanionsMarkup(invitat) {
    const companions = getTableCompanions(invitat);

    if (!companions.length) {
        return `
            <section class="guest-feature">
                <h3 class="guest-feature__title">Cine mai e la masa ta</h3>
                <div class="companions companions--empty">Momentan nu avem alte prenume afișate pentru masa ta.</div>
            </section>
        `;
    }

    return `
        <section class="guest-feature">
            <h3 class="guest-feature__title">Cine mai e la masa ta</h3>
            <div class="companions">
                ${companions.map(name => `<span class="companion-pill">${escapeHtml(name)}</span>`).join('')}
            </div>
        </section>
    `;
}

function renderMenuMarkup() {
    const menu = guestExperienceData?.menu || [];

    if (!menu.length) {
        return '';
    }

    return `
        <section class="guest-feature">
            <h3 class="guest-feature__title">Meniul serii</h3>
            <div class="menu-list">
                ${menu.map((item, index) => `
                    <div class="menu-item">
                        <div class="menu-item__number">${index + 1}</div>
                        <div class="menu-item__content">
                            <div class="menu-item__course">${escapeHtml(item.course)}</div>
                            <div class="menu-item__description">${escapeHtml(item.description)}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

function setupTabsInteraction() {
    const buttons = resultDiv.querySelectorAll('.tab-button');
    const panes = resultDiv.querySelectorAll('.tab-pane');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const tabName = this.dataset.tab;

            buttons.forEach(btn => btn.classList.remove('is-active'));
            panes.forEach(pane => pane.classList.remove('is-active'));

            this.classList.add('is-active');
            resultDiv.querySelector(`[data-tab="${tabName}"].tab-pane`)?.classList.add('is-active');
        });
    });
}

function setupTimelineInteraction() {
    const timeline = guestExperienceData?.timeline || [];

    if (!timeline.length) {
        return;
    }

    const steps = resultDiv.querySelectorAll('.timeline-step');
    const detailTime = resultDiv.querySelector('.timeline-detail__time');
    const detailTitle = resultDiv.querySelector('.timeline-detail__title');
    const detailText = resultDiv.querySelector('.timeline-detail__text');

    if (!steps.length || !detailTime || !detailTitle || !detailText) {
        return;
    }

    steps.forEach(step => {
        step.addEventListener('click', function () {
            const index = Number(this.dataset.timelineIndex || 0);
            const item = timeline[index];

            if (!item) {
                return;
            }

            steps.forEach(node => node.classList.remove('is-active'));
            this.classList.add('is-active');

            detailTime.textContent = item.time;
            detailTitle.textContent = item.title;
            detailText.textContent = item.description;
        });
    });
}

function clearResult() {
    resultDiv.classList.remove('show', 'success', 'error');
    resultDiv.innerHTML = '';
    resultDiv.textContent = '';
}

function clearSuggestions() {
    suggestionsDiv.innerHTML = '';
    suggestionsDiv.classList.remove('show');
}

function renderSuggestions(input) {
    const query = normalizeText(input);

    if (!query) {
        clearSuggestions();
        return;
    }

    const matches = invitati
        .map(invitat => ({
            ...invitat,
            normalizedName: normalizeText(invitat.nume)
        }))
        .filter(invitat => invitat.normalizedName.includes(query) || invitat.normalizedName.startsWith(query))
        .sort((a, b) => a.nume.localeCompare(b.nume, 'ro'))
        .slice(0, 5);

    if (!matches.length) {
        suggestionsDiv.innerHTML = '<div class="suggestions__empty">Niciun nume similar găsit</div>';
        suggestionsDiv.classList.add('show');
        return;
    }

    suggestionsDiv.innerHTML = matches
        .map(invitat => `
            <button type="button" class="suggestion-chip" data-name="${escapeHtml(invitat.nume)}">
                <span class="suggestion-chip__name">${escapeHtml(invitat.nume)}</span>
            </button>
        `)
        .join('');
    suggestionsDiv.classList.add('show');

    suggestionsDiv.querySelectorAll('.suggestion-chip').forEach(button => {
        button.addEventListener('click', function () {
            nameInput.value = this.dataset.name || '';
            clearSuggestions();
            cautareNume();
        });
    });
}

function showError(message) {
    resultDiv.classList.remove('show', 'success');
    resultDiv.classList.add('error', 'show');
    resultDiv.innerHTML = `<div class="result-message">${escapeHtml(message)}</div>`;
}

function renderGuestCard(invitat) {
    resultDiv.classList.remove('error', 'show');
    resultDiv.classList.add('success', 'show');
    resultDiv.innerHTML = `
        <div class="guest-card">
            <div class="guest-card__ornament guest-card__ornament--left"></div>
            <div class="guest-card__ornament guest-card__ornament--right"></div>
            <div class="guest-card__shine"></div>
            <div class="guest-card__eyebrow">✨ Bine ai venit la nuntă ✨</div>
            <div class="guest-card__name">${escapeHtml(invitat.nume)}</div>
            <div class="guest-card__text">Ne bucurăm să te avem alături la cea mai frumoasă zi din viața noastră.</div>
            <div class="guest-card__label">Vei sta la</div>
            <div class="guest-card__table-wrap">
                <div class="guest-card__table-label">Masa ta</div>
                <div class="guest-card__table">${escapeHtml(invitat.masa)}</div>
            </div>
            <div class="guest-card__hint">Îți dorim o seară de neuitat!</div>
            <div class="guest-features-tabs">
                <div class="tabs-header">
                    <button type="button" class="tab-button is-active" data-tab="map">
                        <span>🗺️ Hartă</span>
                    </button>
                    <button type="button" class="tab-button" data-tab="companions">
                        <span>👥 La masa ta</span>
                    </button>
                </div>
                <div class="tabs-content">
                    <div class="tab-pane is-active" data-tab="map">
                        ${renderMiniMapMarkup(invitat)}
                    </div>
                    <div class="tab-pane" data-tab="companions">
                        ${renderCompanionsMarkup(invitat)}
                    </div>
                </div>
            </div>
        </div>
    `;

    setupTabsInteraction();
}

function renderAmbiguousCard(query, rezultate) {
    const preview = rezultate
        .slice(0, 3)
        .map(invitat => `<li>${escapeHtml(invitat.nume)}</li>`)
        .join('');

    const extraCount = rezultate.length - Math.min(rezultate.length, 3);

    resultDiv.classList.remove('success', 'show');
    resultDiv.classList.add('error', 'show');
    resultDiv.innerHTML = `
        <div class="guest-card guest-card--ambiguous">
            <div class="guest-card__ornament guest-card__ornament--left"></div>
            <div class="guest-card__ornament guest-card__ornament--right"></div>
            <div class="guest-card__eyebrow">⚠️ Mai multe potriviri</div>
            <div class="guest-card__name">${escapeHtml(query)}</div>
            <div class="guest-card__text">Am găsit mai mulți invitați cu nume similar. Scrie numele complet ca să alegem corect.</div>
            <ul class="guest-card__list">
                ${preview}
                ${extraCount > 0 ? `<li>și încă ${extraCount} invitați</li>` : ''}
            </ul>
        </div>
    `;
}

// Funcția de căutare
function cautareNume() {
    const input = nameInput.value.trim();

    if (!input) {
        showError('❌ Te rog introdu-ți numele!');
        return;
    }

    const searchWords = normalizeText(input).split(/\s+/).filter(Boolean);
    const normalizedInput = normalizeText(input);

    const rezultate = invitati
        .map(invitat => {
            const normalizedName = normalizeText(invitat.nume);
            const nameWords = normalizedName.split(/\s+/).filter(Boolean);
            const matches = searchWords.every(searchWord =>
                nameWords.some(nameWord => nameWord.startsWith(searchWord))
            );

            return {
                ...invitat,
                normalizedName,
                matches,
                exact: normalizedName === normalizedInput
            };
        })
        .filter(invitat => invitat.matches)
        .sort((a, b) => {
            if (a.exact !== b.exact) {
                return a.exact ? -1 : 1;
            }
            return a.nume.localeCompare(b.nume, 'ro');
        });

    setTimeout(() => {
        if (rezultate.length === 0) {
            showError(`❌ Numele "${input}" nu a fost găsit`);
            return;
        }

        const exactMatch = rezultate.find(invitat => invitat.exact);

        if (exactMatch) {
            renderGuestCard(exactMatch);
            return;
        }

        if (rezultate.length === 1) {
            renderGuestCard(rezultate[0]);
            return;
        }

        renderAmbiguousCard(input, rezultate);
    }, 100);
}

function reseteazaCautarea() {
    nameInput.value = '';
    clearResult();
    clearSuggestions();
    nameInput.focus();
}

function renderGallery(filterCategory = 'all') {
    const allImages = galleryData?.images || [];
    
    const filteredImages = filterCategory === 'all' 
        ? allImages 
        : allImages.filter(img => img.category === filterCategory);
    
    currentGalleryImages = filteredImages;
    
    if (!galleryGrid) return;
    
    if (filteredImages.length === 0) {
        galleryGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #999; padding: 40px 20px;">Nicio imagine în această categorie</div>`;
        return;
    }
    
    galleryGrid.innerHTML = filteredImages
        .map((img, index) => `
            <div class="gallery-item" data-index="${index}">
                <img 
                    class="gallery-item__image" 
                    src="${escapeHtml(img.src)}" 
                    alt="${escapeHtml(img.caption)}"
                    loading="lazy"
                >
                ${img.caption ? `<div class="gallery-item__caption">${escapeHtml(img.caption)}</div>` : ''}
            </div>
        `)
        .join('');
    
    // Add click handlers to gallery items
    galleryGrid.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
}

function updateGalleryCounts() {
    const allImages = galleryData?.images || [];
    const categories = ['all', 'pregătiri', 'ceremonie', 'petrecere', 'detalii'];
    
    categories.forEach(cat => {
        const button = document.querySelector(`[data-category="${cat}"]`);
        if (button) {
            const count = cat === 'all' 
                ? allImages.length 
                : allImages.filter(img => img.category === cat).length;
            const label = button.innerText.split('(')[0].trim();
            button.innerText = `${label} (${count})`;
        }
    });
}

function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-cat-button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('is-active'));
            this.classList.add('is-active');
            renderGallery(this.dataset.category);
        });
    });
}

function openLightbox(index) {
    currentLightboxIndex = index;
    const img = currentGalleryImages[index];
    
    if (!img) return;
    
    lightboxImage.src = img.src;
    lightboxImage.alt = img.caption || 'Imagine galerie';
    lightboxCaption.textContent = img.caption || '';
    lightbox.classList.add('is-open');
}

function closeLightbox() {
    lightbox.classList.remove('is-open');
}

function navLightbox(direction) {
    let newIndex = currentLightboxIndex + direction;
    
    if (newIndex < 0) {
        newIndex = currentGalleryImages.length - 1;
    } else if (newIndex >= currentGalleryImages.length) {
        newIndex = 0;
    }
    
    openLightbox(newIndex);
}

// Google Photos Integration
const STORAGE_KEY = 'weddingGalleryImages';

function getStoredImages() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function saveImageToStorage(imageData) {
    try {
        const stored = getStoredImages();
        const newImage = {
            id: `uploaded-${Date.now()}`,
            src: imageData.secure_url,
            category: 'petrecere', // Default category for uploads
            caption: imageData.original_filename.replace(/\.[^.]*$/, '') || 'Photo'
        };
        stored.push(newImage);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        return newImage;
    } catch (e) {
        console.error('Error saving image:', e);
        return null;
    }
}


function initializeStoredImages() {
    const stored = getStoredImages();
    if (stored.length > 0 && galleryData.images) {
        // Merge stored images with existing data
        stored.forEach(img => {
            const exists = galleryData.images.some(existing => existing.id === img.id);
            if (!exists) {
                galleryData.images.push(img);
            }
        });
    }
}

function setupLightboxControls() {
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', closeLightbox);
    }
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => navLightbox(-1));
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => navLightbox(1));
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-open')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navLightbox(-1);
        if (e.key === 'ArrowRight') navLightbox(1);
    });
}

function setupMainTabsInteraction() {
    const buttons = document.querySelectorAll('.main-tab-button');
    const panes = document.querySelectorAll('.main-tab-pane');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const tabName = this.dataset.tab;

            buttons.forEach(btn => btn.classList.remove('is-active'));
            panes.forEach(pane => pane.classList.remove('is-active'));

            this.classList.add('is-active');
            document.querySelector(`[data-tab="${tabName}"].main-tab-pane`)?.classList.add('is-active');
        });
    });
}

function initializePageContent() {
    // Render program content
    if (programContent) {
        const timeline = guestExperienceData?.timeline || [];
        if (timeline.length) {
            programContent.innerHTML = `
                <div class="program-list">
                    ${timeline.map((item, index) => `
                        <div class="program-item">
                            <div class="program-item__time">${escapeHtml(item.time)}</div>
                            <div class="program-item__content">
                                <div class="program-item__title">${escapeHtml(item.title)}</div>
                                <div class="program-item__description">${escapeHtml(item.description)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    // Render menu content
    if (menuContent) {
        const menu = guestExperienceData?.menu || [];
        if (menu.length) {
            menuContent.innerHTML = `
                <div class="menu-list-main">
                    ${menu.map((item, index) => `
                        <div class="menu-item-main">
                            <div class="menu-item-main__number">${index + 1}</div>
                            <div class="menu-item-main__content">
                                <div class="menu-item-main__course">${escapeHtml(item.course)}</div>
                                <div class="menu-item-main__description">${escapeHtml(item.description)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    // Setup gallery
    updateGalleryCounts();
    renderGallery('all');
    setupGalleryFilters();
    setupLightboxControls();
}

// Inițializare - Adaugă event listener pentru Enter
document.addEventListener('DOMContentLoaded', function() {
    initializeStoredImages(); // Load images from localStorage
    setupMainTabsInteraction();
    initializePageContent();

    searchButton.addEventListener('click', cautareNume);
    resetButton.addEventListener('click', reseteazaCautarea);

    nameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            cautareNume();
        }
    });

    nameInput.addEventListener('input', function() {
        if (!nameInput.value.trim()) {
            clearResult();
            clearSuggestions();
            return;
        }

        renderSuggestions(nameInput.value);
    });

    renderSuggestions(nameInput.value);
});
