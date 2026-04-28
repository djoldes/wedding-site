# 📤 Cloudinary Setup - Instrucțiuni

Aceasta permite invitaților să uploadeze poze direct de la eveniment și să apară automat în galerie!

## Pasul 1: Creează cont Cloudinary (Gratuit)

1. Mergi pe [cloudinary.com](https://cloudinary.com)
2. Click "Sign Up Free"
3. Completează email și parolă
4. Verifică email-ul
5. Acum ai cont creat! 🎉

## Pasul 2: Preluă Cloud Name

1. Deschide [Dashboard Cloudinary](https://cloudinary.com/console)
2. Vezi "Cloud Name" în stânga (sub profilul tău)
3. Exemplu: `djgbk34nx` - **copiază asta**

## Pasul 3: Configurează Upload Preset

1. Mergi în **Settings** (roată care icon, bottom-left)
2. Click pe tab **Upload** 
3. Scroll down și găsește "Upload presets"
4. Click "Add upload preset"
5. Completează:
   - **Name**: `wedding_gallery`
   - **Folder**: `wedding/photos`
   - **Unsigned mode**: ON (important!)
   - Click "Save"

## Pasul 4: Adaugă Cloud Name în Code

Deschide `script.js` și găsește linia:

```javascript
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUDINARY_CLOUD_NAME';
```

Înlocuiește `YOUR_CLOUDINARY_CLOUD_NAME` cu Cloud Name-ul tău (ex: `djgbk34nx`)

## Gata! 🎊

Acum:
- Click "📤 Alege fotografia" pe tab Galerie
- Invitații pot selecta / face o poză
- Fotografia urcă automat în Cloudinary
- Apare instant în galerie

## Features

✅ Upload din telefon (camera)  
✅ Upload din galeria din telefon  
✅ Imagini apare instant  
✅ Salvate în cloud (gratuit 25GB)  
✅ Fără limit de upload

## Gratis = Cat?

- **25GB storage** (1000+ poze)
- **Upload nelimitat**
- **CDN gratuit**
- Sigur și stabil

## FAQ

**Q: Invitații trebuie cont Cloudinary?**
A: Nu! Doar tu setup-ai. Invitații doar aleg poze.

**Q: Poze vor dispărea?**
A: Nu dacă plătești (99$/an). Gratis: dacă nu o folosești 6 luni, Cloudinary o șterg. Wedding e o dată, deci backup poze pe Google Drive 😉

**Q: Cât cost?**
A: 0$ pentru 25GB. After-ului? Backup manual google drive, or pay $99/an.

**Q: Mobile-friendly?**
A: Da! Perfect pe telefon.

**Q: Se pot adauga poze dintr-o dată mai târziu?**
A: Da! Oricând. Doar deschide tab-ul Galerie și click Upload.

## Troubleshooting

**Cloud Name blank?**
- Verifica zona right in Cloudinary Dashboard - e clar scris

**Upload widget nu apare?**
- Verifica Cloud Name din script.js
- Ctrl+Shift+R să refresh pagina cu cache
- Check console (F12) pentru erori

**Poze nu se salvează?**
- Verifica că localStorage e enabled în browser
- Upload preset trebuie să existe și să se numească `wedding_gallery`

## Video Guide (Optional)

Căută pe YouTube: "Cloudinary Upload Widget Tutorial" - e identic setup-ul.

**Done? Test-ează acum!** 🚀📸
