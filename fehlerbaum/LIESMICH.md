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
5. **Laptop:** Oben „Ansicht: Baum | Tafel“. **Baum** = klassischer Fehlerbaum von oben nach unten mit Verbindungslinien (Standard), **Tafel** = zwei Spalten wie die Klapptafel. Die Karten erscheinen als „✓ eingegangen – antippen zum Zeigen“. Antippen = am Beamer zeigen. Nochmal antippen = wieder verdecken.
6. **Handy:** Nach der Freigabe ist die Karte gesperrt. Nach dem Verdecken kann die Gruppe wieder ändern.
7. **ZFG – Äste aufdecken:** Unter dem Symptom stehen zwei leere graue Kästchen: links **Zündung**, rechts **Kompression zu niedrig**. Antippen oder Taste **Z** / **K** deckt sie auf. Zündung danach antippen = durchkreuzen (Zündspule getauscht, Aussetzer bleibt). Nur unter „Kompression“ geht es weiter zu den Ursachen.
   **Ursachen aufdecken:** Zu Beginn sind die Ursachen leere „?“-Kästchen (5 vorbereitete + 1 frei). Sie füllen sich in der Reihenfolge, in der die Klasse sie nennt. Drei Wege:
   - **Taste 1–5 am Laptop:** deckt Ursache Nr. 1–5 auf (1 Kolbenringe, 2 ZKD, 3 Einlassventil, 4 Auslassventil, 5 Riefen). Nochmal drücken = zurücknehmen. Die Klasse sieht keine Liste.
   - **iPad als Fernbedienung:** auf der QR-Seite den roten Code „Lehrkraft“ mit dem iPad scannen. Dort ein „?“ antippen → Ursache wählen → erscheint am Beamer.
   - **„?“ am Laptop antippen:** Auswahlliste – Achtung, die sieht die Klasse am Beamer mit.
   - Unerwartete Antwort: in der Auswahl „Eigene Karte“ eintippen. Falsch aufgedeckt: in der Auswahl unter „Schon aufgedeckt“ zurücknehmen.
   - Sobald eine Ursache eingekreist ist, verschwinden die übrigen leeren Kästchen.
8. **Laptop:** Ursachen antippen: 1× = durchgekreuzt, 2× = eingekreist (dann erscheint „Druckverlust: Luft am Auspuff“ und der Pfeil), 3× = normal. Checkfragen ☐ antippen = abhaken. Die 4 roten Karten der Fehlerkette (Ventil schließt nicht → Hydroelement klemmt ausgefahren → Ölschlamm → Ölservice überfällig) einzeln antippen = einblenden.
9. **Tische:** Start mit A+B (beide Tische untereinander), umschaltbar auf A oder B.
10. **Sichern:** „Bild speichern“ (PNG für den Einstieg am Mittwoch) oder „PDF/Drucken“ (druckt genau dieses Bild auf A4 quer; im Druckdialog „Als PDF speichern“ wählen).
11. **Ausfall testen:** Laptop-Seite neu laden → der Stand kommt zurück. WLAN am Handy kurz aus und wieder an → Karte erneut senden.

Ohne Internet ausprobieren: „Probelauf nur in diesem Browser“ und die Karte in einem zweiten Tab öffnen.

## Im Unterricht

- Pro Klasse „Neue Sitzung“ → neuer Code → QR-Codes neu (am iPad zeigen oder drucken). Ohne QR: `…/fehlerbaum/karte.html` öffnen und den Code vom Beamer eingeben.
- Masteransicht innerhalb von 10 h ohne Code erneut geöffnet → dieselbe Sitzung läuft weiter.
- „Leiste aus“ (Taste L) blendet die Knöpfe aus, „Vollbild“ für den Beamer.
- „Testdaten“ füllt nur leere Tische mit Beispielkarten (zum Üben, nicht in der Stunde).
- Fallback: laminierte Papier-Lückenkarten (gleicher Lückensatz).

## Interaktive Tafel (z. B. StarBoard)

- Masteransicht im Browser der Tafel öffnen (Chrome oder Edge, aktuelle Version), dann „Vollbild“. Alles lässt sich mit dem Finger antippen.
- Tasten Z/K und 1–5 brauchen eine Tastatur. An der Tafel deshalb das iPad als Fernbedienung nutzen (roter QR „Lehrkraft“), sonst sieht die Klasse die Auswahlliste.
- Vorher einmal testen: Lädt die Seite, ist „● verbunden“ grün, stimmt die Schriftgröße?

## Bekannte Grenzen von ntfy.sh (wichtig für die Schule)

- ntfy.sh zählt pro **öffentlicher IP-Adresse**. In der Schule teilen sich meist alle Geräte eine IP. Grenzen des kostenlosen Dienstes: höchstens 30 offene Verbindungen und 60 Anfragen auf einmal, danach eine Anfrage pro 5 Sekunden. Eine Klasse mit 8–10 Geräten bleibt deutlich darunter; mehrere Klassen gleichzeitig nicht.
- Der Kanalname (`kfz-fehlerbaum-` + Code) ist nicht geschützt: Wer ihn kennt, kann mitlesen und senden. Deshalb nur Stichworte, keine Namen.
- Nachrichten bleiben ca. 12 h auf ntfy.sh gespeichert, danach verschwinden sie.
- Vor dem Einsatz mit SuS: kurz mit dem Datenschutzbeauftragten klären.

## Neuen Baum anlegen (z. B. BW5 Aufladung)

`baeume/ventiltrieb.json` kopieren, z. B. als `baeume/aufladung.json`, Texte ändern, dann `master.html?baum=aufladung` öffnen.
Bausteine (`typ`): `symptom`, `check`, `ursachen`, `stationen`, `lehrkraft`. `spalte` 1 = links, 2 = rechts.
Startansicht: oben in der Datei `"layout": "klassisch"` (Baum) oder `"tafel"`. Ohne Angabe: Baum.
Startansicht der Tische: bei `stationen` `"startansicht": "alle"` (oder `"A"`, `"B"`).
Äste: Baustein `zweige` mit Karten (`text`, `detail`, `taste`; der Ast mit `"weiter": true` führt zu den Ursachen).
Ursachen aufdecken: im Baustein `ursachen` `"aufdecken": true` und `"leer": 1` (Anzahl freier Kästchen). Ohne `aufdecken` sind alle Ursachen von Anfang an sichtbar.
Fehlerkette: beliebig viele Karten im Baustein `lehrkraft`, sie stehen nebeneinander mit Pfeilen.
Lückensatz: Text in Anführungszeichen, Lücke als `{ "feld": "f1", "max": 25 }`, Ankreuzen als `{ "wahl": "w1", "optionen": ["Ja", "Nein"] }`.

**Bitte prüfen:** Die Leitfragen der vier Stationen habe ich passend zu den Lückensätzen formuliert. Bitte mit den Papier-Lückenkarten abgleichen und in `ventiltrieb.json` anpassen.
