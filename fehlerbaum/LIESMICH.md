# Digitaler Fehlerbaum – Prototyp (Stand 13.11.2026)

## Hochladen

Den ganzen Ordner `fehlerbaum/` ins Repo **LeChrisL/KFZ-Elisabeth** hochladen (GitHub → „Add file“ → „Upload files“, Ordner hineinziehen).
Danach ist das Tool erreichbar unter:

`https://lechrisl.github.io/KFZ-Elisabeth/fehlerbaum/`

Kein Konto, keine Einrichtung nötig. Die Übertragung läuft über ntfy.sh.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Startseite |
| `master.html` | Masteransicht am Beamer |
| `karte.html` | Gruppenkarte (iPad/Handy) |
| `qr.html` | QR-Codes einer Sitzung zum Drucken oder Zeigen |
| `baeume/ventiltrieb.json` | Inhalt BW3 (Symptom, Ursachen, Stationen, Lückensätze, Lehrkraftkarten) |
| `js/einstellungen.js` | Dienst (ntfy.sh) und Server – nur hier ändern |
| `js/verbindung.js` | Übertragung, austauschbar (später Supabase) |
| `lib/` | QR-Code und Bildexport (lokal, keine fremden Server) |

## Probelauf zu Hause (ca. 15 min)

1. **Laptop (= Beamer):** Startseite → „BW3 Ventiltrieb – Masteransicht“. Oben rechts steht der Sitzungscode und „● verbunden“.
2. **QR-Codes:** Knopf „QR-Codes“ → neue Seite mit 8 Codes (St. 1–4, Tisch A und B).
3. **Handy:** QR-Code „Station 2 · Tisch A“ scannen → „verbrannt“ eintippen → Absenden.
4. **iPad:** QR-Code „Station 3 · Tisch A“ scannen → beide Lücken ausfüllen → Absenden.
5. **Laptop:** Die Karten erscheinen als „✓ eingegangen – antippen zum Zeigen“. Antippen = am Beamer zeigen. Nochmal antippen = wieder verdecken.
6. **Handy:** Nach der Freigabe ist die Karte gesperrt. Nach dem Verdecken kann die Gruppe wieder ändern.
7. **Laptop:** Ursachen antippen: 1× = durchgekreuzt, 2× = eingekreist (dann erscheint „Druckverlust: Luft am Auspuff“ und der Pfeil), 3× = normal. Checkfragen ☐ antippen = abhaken. Rote Karten „Hydroelement klemmt“ und „Ölschlamm“ antippen = einblenden.
8. **Tische:** Umschalten A / B / A+B.
9. **Sichern:** „Bild speichern“ (PNG für den Einstieg am Mittwoch) oder „PDF/Drucken“.
10. **Ausfall testen:** Laptop-Seite neu laden → der Stand kommt zurück. WLAN am Handy kurz aus und wieder an → Karte erneut senden.

Ohne Internet ausprobieren: „Probelauf nur in diesem Browser“ und die Karte in einem zweiten Tab öffnen.

## Im Unterricht

- Pro Klasse „Neue Sitzung“ → neuer Code → QR-Codes neu (am iPad zeigen oder drucken). Ohne QR: `…/fehlerbaum/karte.html` öffnen und den Code vom Beamer eingeben.
- Masteransicht innerhalb von 10 h ohne Code erneut geöffnet → dieselbe Sitzung läuft weiter.
- „Leiste aus“ (Taste L) blendet die Knöpfe aus, „Vollbild“ für den Beamer.
- „Testdaten“ füllt nur leere Tische mit Beispielkarten (zum Üben, nicht in der Stunde).
- Fallback: laminierte Papier-Lückenkarten (gleicher Lückensatz).

## Bekannte Grenzen von ntfy.sh (wichtig für die Schule)

- ntfy.sh zählt pro **öffentlicher IP-Adresse**. In der Schule teilen sich meist alle Geräte eine IP. Grenzen des kostenlosen Dienstes: höchstens 30 offene Verbindungen und 60 Anfragen auf einmal, danach eine Anfrage pro 5 Sekunden. Eine Klasse mit 8–10 Geräten bleibt deutlich darunter; mehrere Klassen gleichzeitig nicht.
- Der Kanalname (`kfz-fehlerbaum-` + Code) ist nicht geschützt: Wer ihn kennt, kann mitlesen und senden. Deshalb nur Stichworte, keine Namen.
- Nachrichten bleiben ca. 12 h auf ntfy.sh gespeichert, danach verschwinden sie.
- Vor dem Einsatz mit SuS: kurz mit dem Datenschutzbeauftragten klären.

## Neuen Baum anlegen (z. B. BW5 Aufladung)

`baeume/ventiltrieb.json` kopieren, z. B. als `baeume/aufladung.json`, Texte ändern, dann `master.html?baum=aufladung` öffnen.
Bausteine (`typ`): `symptom`, `check`, `ursachen`, `stationen`, `lehrkraft`. `spalte` 1 = links, 2 = rechts.
Lückensatz: Text in Anführungszeichen, Lücke als `{ "feld": "f1", "max": 25 }`, Ankreuzen als `{ "wahl": "w1", "optionen": ["Ja", "Nein"] }`.

**Bitte prüfen:** Die Leitfragen der vier Stationen habe ich passend zu den Lückensätzen formuliert. Bitte mit den Papier-Lückenkarten abgleichen und in `ventiltrieb.json` anpassen.
