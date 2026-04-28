# 📸 Ghid Galerie Foto

## Cum adaugi imagini în galerie

### 1. Structura folderelor
Creează folder-ul `images/` în rădăcina proiectului cu următoarea structură:

```
wedding-site/
├── images/
│   ├── pregătiri/          # Poze cu pregătiri, machiaj, îmbrăcăminte
│   ├── ceremonie/           # Poze din ceremonie
│   ├── petrecere/           # Poze din după ceremonie, cu mâncare
│   └── detalii/             # Detalii, decorațiuni, aranjamente
├── data.js
├── script.js
├── style.css
└── index.html
```

### 2. Adăugarea imaginilor în `data.js`

Deschide `data.js` și completează array-ul `galleryData.images`:

```javascript
const galleryData = {
    images: [
        { 
            id: "prep-1", 
            src: "images/pregătiri/01.jpg", 
            category: "pregătiri", 
            caption: "Machiajul" 
        },
        { 
            id: "prep-2", 
            src: "images/pregătiri/02.jpg", 
            category: "pregătiri", 
            caption: "Ținuta" 
        },
        { 
            id: "cer-1", 
            src: "images/ceremonie/01.jpg", 
            category: "ceremonie", 
            caption: "Ceremonia" 
        },
        { 
            id: "petr-1", 
            src: "images/petrecere/01.jpg", 
            category: "petrecere", 
            caption: "Cina" 
        },
        { 
            id: "det-1", 
            src: "images/detalii/01.jpg", 
            category: "detalii", 
            caption: "Inelele" 
        },
        // Adaugă mai multe...
    ]
};
```

### 3. Formatele și dimensiunile recomandate

- **Formate**: JPG, PNG, WebP
- **Dimensiuni**: 1200px × 1200px minimum
- **Dimensiune fișier**: 300KB - 1MB per imagine (comprimă cu TinyPNG)
- **Total galerie**: Max ~50-100MB pentru GitHub

### 4. Proprietățile imaginii

Fiecare imagine are:
- `id`: Identificator unic (ex: "prep-1", "cer-2")
- `src`: Path-ul relativ la imagine (ex: "images/pregătiri/01.jpg")
- `category`: Una din: "pregătiri", "ceremonie", "petrecere", "detalii"
- `caption`: Text optional care apare sub imagine (poate fi gol "")

### 5. Categoriile disponibile

| Categorie | Icon | Descriere |
|-----------|------|-----------|
| pregătiri | 💄 | Machiaj, ținută, pini, fotografii de detaliu |
| ceremonie | ⛪ | Doar momentele ceremoniei |
| petrecere | 🎉 | După ceremonie, cina, momente sociale |
| detalii | ✨ | Decorațiuni, flori, tablă numere, detalii |

### 6. Exemplu complet

```javascript
const galleryData = {
    images: [
        // Pregătiri
        { id: "p1", src: "images/pregătiri/makeup.jpg", category: "pregătiri", caption: "Machiajul miresei" },
        { id: "p2", src: "images/pregătiri/dress.jpg", category: "pregătiri", caption: "Rochia" },
        
        // Ceremonie
        { id: "c1", src: "images/ceremonie/chiesa.jpg", category: "ceremonie", caption: "La altar" },
        { id: "c2", src: "images/ceremonie/rings.jpg", category: "ceremonie", caption: "Inelele" },
        
        // Petrecere
        { id: "e1", src: "images/petrecere/welcome.jpg", category: "petrecere", caption: "Intrarea în sală" },
        { id: "e2", src: "images/petrecere/dinner.jpg", category: "petrecere", caption: "Cina" },
        { id: "e3", src: "images/petrecere/dance.jpg", category: "petrecere", caption: "Dansul mirilor" },
        
        // Detalii
        { id: "d1", src: "images/detalii/flowers.jpg", category: "detalii", caption: "Decorațiuni florale" },
        { id: "d2", src: "images/detalii/table.jpg", category: "detalii", caption: "Aranjamentul mesei" }
    ]
};
```

### 7. Cum funcționează galeria

- **Filtrare**: Click pe categorii pentru filtru
- **Lightbox**: Click pe imagine pentru a o vedea full-screen
- **Navigare**: 
  - Click pe săgeți (❮ ❯)
  - Taste arrow left/right
  - Esc pentru a inchide
- **Swipe**: Pe mobile, glisează stânga/dreapta (optional - poți adăuga mai târziu)

### 8. Deploy pe GitHub

1. Creează folder `images/` și subfolderele
2. Adaugă imagini compresate
3. Update `data.js` cu datele imaginilor
4. Commit și push:
```bash
git add images/
git add data.js
git commit -m "Add wedding photos"
git push origin main
```

### Tips & Tricuri

✅ **Bun**:
- Imagini orizontale (landscape) pentru variatate
- Mix de portrete și landscape
- Poze clare, bine aprinse
- Descrieri scurte și frumoase

❌ **Evita**:
- Imagini foarte mare (>2MB fiecare)
- Prea multa saturație de culori
- Imagini pixelate sau low-quality
- Poza identice (taglia best moment)

### Probleme comune

**Galeria e goală?**
- Verifică că path-ul din `src` este corect
- Asigură-te că fișierele sunt în folderul potrivit
- Reîncarcă pagina (Ctrl+Shift+R)

**Imaginile nu se încarcă?**
- Verifica extensia fișierului (.jpg, .png)
- Asigură-te că nu ai doi "/" în path
- Compresează imaginea dacă e prea mare

Direcții spre succes, albă zivă! 🎊✨
