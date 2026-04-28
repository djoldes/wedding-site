document.addEventListener('DOMContentLoaded', function () {
    const totalGuests = document.getElementById('totalGuests');
    const totalTables = document.getElementById('totalTables');
    const largestTable = document.getElementById('largestTable');
    const organizerDescription = document.getElementById('organizerDescription');
    const organizerNotes = document.getElementById('organizerNotes');
    const tableList = document.getElementById('tableList');

    const tableMap = new Map();

    for (const invitat of invitati) {
        const masa = String(invitat.masa);
        tableMap.set(masa, (tableMap.get(masa) || 0) + 1);
    }

    const sortedTables = [...tableMap.entries()]
        .sort((a, b) => Number(a[0]) - Number(b[0]));

    totalGuests.textContent = invitati.length;
    totalTables.textContent = sortedTables.length;
    largestTable.textContent = sortedTables.length
        ? Math.max(...sortedTables.map(([, count]) => count))
        : 0;

    organizerDescription.textContent = organizerData.description;
    organizerNotes.innerHTML = organizerData.notes
        .map(note => `<li>${note}</li>`)
        .join('');

    tableList.innerHTML = sortedTables
        .map(([table, count]) => `
            <div class="table-item">
                <span class="table-name">Masa ${table}</span>
                <span class="table-count">${count} invitați</span>
            </div>
        `)
        .join('');
});