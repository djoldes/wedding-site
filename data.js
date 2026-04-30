const weddingStorageKeys = {
    guests: 'weddingGuestsData',
    tableZones: 'weddingTableZonesData',
    guestSeedVersion: 'weddingGuestSeedVersion'
};

function loadStoredJson(key, fallback) {
    try {
        const rawValue = localStorage.getItem(key);
        if (!rawValue) {
            return fallback;
        }

        return JSON.parse(rawValue);
    } catch {
        return fallback;
    }
}

function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
}

function loadGuestsWithSeedVersion() {
    const configuredSeedVersion = typeof guestSeedVersion === 'string' ? guestSeedVersion : 'v1';
    const storedSeedVersion = localStorage.getItem(weddingStorageKeys.guestSeedVersion);
    const storedGuests = loadStoredJson(weddingStorageKeys.guests, null);

    if (!Array.isArray(storedGuests) || storedSeedVersion !== configuredSeedVersion) {
        const seededGuests = deepClone(defaultInvitati);
        localStorage.setItem(weddingStorageKeys.guests, JSON.stringify(seededGuests));
        localStorage.setItem(weddingStorageKeys.guestSeedVersion, configuredSeedVersion);
        return seededGuests;
    }

    return storedGuests;
}

const invitati = loadGuestsWithSeedVersion();

const guestExperienceData = {
    timeline: [
        {
            time: "17:30",
            title: "Primire invitați",
            description: "Gazdele te întâmpină la intrare, iar zona de welcome este deschisă."
        },
        {
            time: "18:30",
            title: "Deschiderea serii",
            description: "Ne așezăm la mese și începe oficial petrecerea."
        },
        {
            time: "20:30",
            title: "Dans & distracție",
            description: "Urmează ringul de dans, momente speciale și multă energie."
        },
        {
            time: "23:30",
            title: "Momentul tortului",
            description: "Ne strângem pentru tort și încă un val de voie bună."
        }
    ],
    tableZones: [
        { id: "A", label: "Zona Garden", tables: [1, 2] },
        { id: "B", label: "Zona Central", tables: [3, 4] },
        { id: "C", label: "Zona Lounge", tables: [5, 6] },
        { id: "D", label: "Zona Terrace", tables: [7, 8] }
    ],
    menu: [
        {
        course: "Antreu",
        description: `Salată de vinete cu roșii concassé
Chifteluțe tradiționale
Speck roll cu cremă fină de brânză, pesto de trufe și ceapă roșie murată
Fingers de pui aromați
Sferă cu telemea în crustă de fistic și merișoare
Ou royal cu turmeric și pastă fină de ficăței
Pan con tomate cu perle de mozzarella și pesto de busuioc
Arancini cu pulled pork, ceapă verde și sos de ardei copt
Mini blinis cu cremă de brânză cu chives și boia afumată
Cartof fondant cu mousse de ardei copt, crispy de bacon și mărar`
        },
        {
        course: "Aperitiv cald",
        description: "Piept de pui marinat în iaurt grecesc, în crustă panko, rondele de cartofi copți cu gremolata și unt, sos Cheddar cu jambon afumat și jalapeño murați."
        },
        {
        course: "Ciorbă",
        description: "Ciorbă rădăuțeană de pui"
        },
        {
        course: "Fel principal",
        description: "Mușchiuleț de porc în crustă de cartofi gratinați cu parmezan, sos demi-glace cu muștar boabe, morcov glazurat și tartar de castraveți și gogoșari murați"
        },
        {
        course: "Sarmale",
        description: "Sărmăluțe cu mămăliguță"
        },
        {
        course: "Desert",
        description: "Tort asortat cu gheață"
        }
    ]
};

function getTableNumbersFromGuests(guests) {
    if (!Array.isArray(guests)) {
        return [];
    }

    return [...new Set(
        guests
            .map(guest => Number(guest?.masa))
            .filter(tableNumber => Number.isInteger(tableNumber) && tableNumber > 0)
    )].sort((a, b) => a - b);
}

function normalizeTableZones(rawZones) {
    const zones = Array.isArray(rawZones) ? deepClone(rawZones) : [];
    const normalized = [];

    zones.forEach((zone, index) => {
        const tables = Array.isArray(zone?.tables)
            ? [...new Set(
                zone.tables
                    .map(tableNumber => Number(tableNumber))
                    .filter(tableNumber => Number.isInteger(tableNumber) && tableNumber > 0)
            )].sort((a, b) => a - b)
            : [];

        if (!tables.length) {
            return;
        }

        normalized.push({
            id: zone?.id || `zone-${index + 1}`,
            label: zone?.label || `Mese ${tables[0]}-${tables[tables.length - 1]}`,
            tables
        });
    });

    return normalized;
}

function buildAutoZonesFromTables(tableNumbers, existingZones) {
    const sortedTables = [...new Set(tableNumbers)].sort((a, b) => a - b);
    if (!sortedTables.length) {
        return [];
    }

    const existingIds = new Set(existingZones.map(zone => String(zone.id || '')));
    const maxExistingIndex = existingZones.reduce((maxIndex, zone) => {
        const match = String(zone.id || '').match(/^auto-zone-(\d+)$/);
        if (!match) {
            return maxIndex;
        }
        return Math.max(maxIndex, Number(match[1]));
    }, 0);

    const autoZones = [];
    const chunkSize = 4;
    let nextIndex = maxExistingIndex + 1;

    for (let index = 0; index < sortedTables.length; index += chunkSize) {
        const chunk = sortedTables.slice(index, index + chunkSize);
        let zoneId = `auto-zone-${nextIndex}`;

        while (existingIds.has(zoneId)) {
            nextIndex += 1;
            zoneId = `auto-zone-${nextIndex}`;
        }

        existingIds.add(zoneId);

        const label = chunk.length === 1
            ? `Zona Extinsa - Masa ${chunk[0]}`
            : `Zona Extinsa ${chunk[0]}-${chunk[chunk.length - 1]}`;

        autoZones.push({
            id: zoneId,
            label,
            tables: chunk
        });

        nextIndex += 1;
    }

    return autoZones;
}

function isAutoGeneratedZone(zone) {
    const zoneId = String(zone?.id || '');
    return /^auto-/.test(zoneId);
}

function syncTableZonesWithGuests(tableZones, guests) {
    const zones = normalizeTableZones(tableZones);
    const guestTables = getTableNumbersFromGuests(guests);
    const manualZones = zones.filter(zone => !isAutoGeneratedZone(zone));
    const configuredTables = new Set(manualZones.flatMap(zone => zone.tables));

    const missingTables = guestTables.filter(tableNumber => !configuredTables.has(tableNumber));

    // Rebuild auto zones at every sync so older formats (auto-<masa>) are migrated to grouped zones.
    const rebuiltZones = [...manualZones];

    rebuiltZones.push(...buildAutoZonesFromTables(missingTables, rebuiltZones));

    return rebuiltZones.sort((a, b) => a.tables[0] - b.tables[0]);
}

const defaultTableZones = deepClone(guestExperienceData.tableZones);
const storedTableZones = loadStoredJson(weddingStorageKeys.tableZones, null);
const baseTableZones = Array.isArray(storedTableZones) ? storedTableZones : deepClone(defaultTableZones);

guestExperienceData.tableZones = syncTableZonesWithGuests(baseTableZones, invitati);
saveWeddingTableZones(guestExperienceData.tableZones);

function saveWeddingGuests(guests) {
    localStorage.setItem(weddingStorageKeys.guests, JSON.stringify(guests));
}

function saveWeddingTableZones(tableZones) {
    localStorage.setItem(weddingStorageKeys.tableZones, JSON.stringify(tableZones));
}

function getWeddingGuests() {
    return invitati;
}

function getWeddingTableZones() {
    return guestExperienceData.tableZones;
}

const organizerData = {
    title: "Panou organizatori",
    description: "Aici poți extinde mai târziu cu import, editare, filtre și statistici.",
    notes: [
        "Datele invitaților sunt separate de partea publică.",
        "Pagina publică rămâne simplă și rapidă pentru căutarea la masă.",
        "Panoul organizatorilor poate primi ulterior funcții de administrare."
    ]
};

const galleryData = {
    // Format: { id: "unique-id", src: "images/path/to/image.jpg", category: "category-name", caption: "Caption text" }
    // Images to add:
    // - Place .jpg/.png files in images/ folders
    // - pregătiri/: images of getting ready
    // - ceremonie/: ceremony photos
    // - petrecere/: reception photos
    // - detalii/: detail shots
    images: [
        // Example: { id: "prep-1", src: "images/pregătiri/01.jpg", category: "pregătiri", caption: "Pregătiri" }
        // Add images here as you upload them
    ]
};

