# DataCrew CMP - Fejlesztői dokumentáció

## Projekt áttekintés
Ingyenes, könnyű Consent Management Platform (CMP) Google Consent Mode v2 támogatással. GTM custom template-ként működik.

## Fájlstruktúra
- `dist/consent-bar.js` - A fő JavaScript kód (olvasható verzió)
- `dist/consent-bar.min.js` - Minifikált verzió (CDN-ről töltődik)
- `template.tpl` - Google Tag Manager sablon fájl
- `README.md` - Felhasználói dokumentáció

## CSS osztályok
A stílusok a `consent-bar.js` `injectStyles()` függvényében vannak definiálva:
- `.dco` - Overlay
- `.dcb` - Banner konténer
- `.dct` - Cím
- `.dctx` - Leírás szöveg
- `.dcbt` - Gombok konténer
- `.dcpb` - Elsődleges gomb
- `.dcsb` - Másodlagos gomb
- `.dccts` - Kategória toggle-k szekció
- `.dcct` - Kategória toggle sor
- `.dci` - Toggle switch
- `.dcf` - Footer

## State kezelés
A `state` objektum tárolja a banner állapotát:
- `v` - Nézet: "i" = initial, "c" = customize
- `l` - Aktuális nyelv
- `ac` - Analytics consent (0/1)
- `mc` - Marketing consent (0/1)
- `rv` - Revisit mód (0/1)

## Tesztelés
A banner tesztelhető a böngésző DevTools-ban:
```javascript
DataCrewConsent.clearConsent(); // Consent törlése és banner megjelenítése
DataCrewConsent.show(true); // Customize nézet megjelenítése
```

## Build
Módosítások után mindkét fájlt frissíteni kell:
- `dist/consent-bar.js` - olvasható verzió
- `dist/consent-bar.min.js` - minifikált verzió
