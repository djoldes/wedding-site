# 📸 Google Photos Album - Setup Ghid

Invitații pot adăuga fotografii direct din telefon în albumul partajat!

## Pasul 1: Creează Album în Google Photos

1. Mergi pe [photos.google.com](https://photos.google.com)
2. Click librăria din stânga
3. Click "Create" → "Album"
4. Denumește: "David & Salomeea - Nunta" (sau orice numești tu)
5. Click "Create"

## Pasul 2: Adaugă "Colaboratori" sau Share-ezi Linkul

**Opțiune A: Doar Link (Recomandă)**
1. Click "Share" pe album
2. Click "Copy link"
3. Gets URL ca: `https://photos.app.goo.gl/R1BEM7ZYHjm3jUN48`

**Opțiune B: Colaboratori (dacă vrei să editeze)**
1. Click "Share"
2. Adaugă emailuri invitați
3. Ei pot adăuga poze direct

## Pasul 3: Updatează Link-ul de pe Site

Deschide `index.html` și găsește linia cu Google Photos link:

```html
href="https://photos.app.goo.gl/R1BEM7ZYHjm3jUN48"
```

Înlocuiește-o cu link-ul tău (din Pasul 2).

Modifică pe ambele locuri:
- `<a href="...">🔗 Deschide Albumul</a>`
- `<iframe src="..." />`

## Pasul 4: Gata! 🎉

Acum:
- Click "🔗 Deschide Albumul" → Se deschide Google Photos
- Invitații adaugă poze direct
- Click "👁️ Previzualizare" → Se vede embed-ul albumului pe site

## Features

✅ Invitații uploadează direct din telefon  
✅ Fără limit de poze  
✅ Auto-ordonate după dată  
✅ Sigur cu Google  
✅ Se vede pe site + link direct  

## Workflow

```
1. Invitat click "🔗 Deschide Albumul"
   ↓
2. Se deschide Google Photos
   ↓
3. Click "+" pentru adauga poze
   ↓
4. Selectează sau face poza
   ↓
5. Apare instant în album!
   ↓
6. Pe site, in "Previzualizare" se vede albumul
```

## Troubleshooting

**Q: Link-ul nu merge?**
A: Asigură-te că albumul e "Shared" (public link). Mergi pe album → Share → Copy link.

**Q: Invitații nu pot adăuga poze?**
A: Doar cu link partajat public, invitații NU pot adăuga direct. Trebuie să:
- Adaugi ca "Colaboratori" (Share → Adaugă emailuri)
- SAU invitații trimit poze pe WhatsApp/email și tu adaugi

**Q: Embed-ul nu se vede pe site?**
A: Google Photos embed e limitat. Click-ează pe "🔗 Deschide Albumul" e mai sigur.

**Q: Cât timp rămân pozele?**
A: Forever! Sunt în Google Photos, nu vor dispărea.

## Tips

💡 Cere invitaților să adauge tags (ex: #pregatiri, #ceremonie)  
💡 Backup photos pe Google Drive dacă vrei arhivă  
💡 Share link pe grup WhatsApp/Facebook cu alți invitați  
💡 După nuntă, descarcă all photos pentru columb personal  

## Link pentru invitați

Poți trimite invitaților asa:

> Hei! Fotografiile din nuntă sunt în albumul partajat. Poți adăuga și poze din telefon tău! 📸
> 
> Link: https://photos.app.goo.gl/R1BEM7ZYHjm3jUN48
> 
> Vizitează și albumul pe site: [link-site-nunta]

---

Done! Enjoy fotografiile! 🎊📸
