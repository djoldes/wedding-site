// Lista publică de invitați cu masele lor
const invitati = [
    { nume: "Ion Popescu", masa: 1 },
    { nume: "Maria Ionescu", masa: 1 },
    { nume: "Ana Popescu", masa: 2 },
    { nume: "George Cristal", masa: 2 },
    { nume: "Elena Stoian", masa: 3 },
    { nume: "Vlad Petrescu", masa: 3 },
    { nume: "Cristina Munteanu", masa: 4 },
    { nume: "Andrei Dobrescu", masa: 4 },
    { nume: "Roxana Stanescu", masa: 5 },
    { nume: "Mihai Georgescu", masa: 5 },
    { nume: "Laura Dinescu", masa: 6 },
    { nume: "Adrian Florian", masa: 6 },
    { nume: "Simona Iancu", masa: 7 },
    { nume: "Bogdan Rares", masa: 7 },
    { nume: "Alina Cercel", masa: 8 },
    { nume: "Radu Ungureanu", masa: 8 }
];

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
        { course: "Antreu", description: "Mix de brânzeturi și charcuterie" },
        { course: "Aperitiv cald", description: "Ruladă de brânză în aluat flo" },
        { course: "Ciorba", description: "Ciorba tradițională de burtă" },
        { course: "Fel principal", description: "Meniu carnivore: cotlet cu garnitură" },
        { course: "Sarmale", description: "Sarmale în caisă, sos tomat" },
        { course: "Desert", description: "Tort asortat cu gheață" }
    ]
};

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

