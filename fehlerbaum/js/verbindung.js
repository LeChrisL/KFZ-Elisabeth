// Verbindungsschicht (austauschbar).
// Jede Verbindung bietet dieselben drei Funktionen:
//   senden(obj)          -> Promise
//   abonnieren(callback) -> callback(obj) für jede Nachricht (auch ältere der Sitzung)
//   status(callback)     -> callback("verbunden" | "getrennt" | "fehler", text)
// Ein späterer Wechsel auf Supabase oder Firebase braucht nur eine weitere
// Funktion nach diesem Muster, die übrigen Seiten bleiben unverändert.

(function () {
  "use strict";

  function ntfyVerbindung(kanal, server) {
    const gesehen = new Set();
    const hoerer = [];
    const statusHoerer = [];
    let quelle = null;

    function meldeStatus(s, t) { statusHoerer.forEach(f => f(s, t || "")); }

    function verbinden() {
      if (quelle) quelle.close();
      quelle = new EventSource(server + "/" + encodeURIComponent(kanal) + "/sse?since=all");
      quelle.onopen = () => meldeStatus("verbunden");
      quelle.onerror = () => meldeStatus("getrennt", "Verbindung unterbrochen – neuer Versuch läuft …");
      quelle.onmessage = (ev) => {
        let n;
        try { n = JSON.parse(ev.data); } catch (e) { return; }
        if (n.event && n.event !== "message") return;
        if (gesehen.has(n.id)) return; // nach einem Neuverbinden kommen alte Nachrichten erneut
        gesehen.add(n.id);
        let obj;
        try { obj = JSON.parse(n.message); } catch (e) { return; }
        hoerer.forEach(f => f(obj));
      };
    }

    return {
      art: "ntfy",
      async senden(obj) {
        const antwort = await fetch(server + "/" + encodeURIComponent(kanal), {
          method: "POST",
          body: JSON.stringify(obj)
        });
        if (!antwort.ok) {
          const t = antwort.status === 429 ? "Zu viele Nachrichten – bitte kurz warten." : "Senden fehlgeschlagen (" + antwort.status + ").";
          meldeStatus("fehler", t);
          throw new Error(t);
        }
      },
      abonnieren(f) { hoerer.push(f); if (!quelle) verbinden(); },
      status(f) { statusHoerer.push(f); }
    };
  }

  // Lokal: nur im selben Browser (Tabs). Ideal zum Ausprobieren und für Tests.
  function lokaleVerbindung(kanal) {
    const speicherSchluessel = "fb-lokal-" + kanal;
    const kanalBC = new BroadcastChannel("fb-" + kanal);
    const hoerer = [];
    const statusHoerer = [];
    function liesProtokoll() {
      try { return JSON.parse(localStorage.getItem(speicherSchluessel) || "[]"); } catch (e) { return []; }
    }
    kanalBC.onmessage = (ev) => hoerer.forEach(f => f(ev.data));
    return {
      art: "lokal",
      async senden(obj) {
        const p = liesProtokoll(); p.push(obj);
        localStorage.setItem(speicherSchluessel, JSON.stringify(p));
        kanalBC.postMessage(obj);
        hoerer.forEach(f => f(obj)); // auch im eigenen Tab ankommen lassen
      },
      abonnieren(f) {
        hoerer.push(f);
        liesProtokoll().forEach(obj => f(obj));
        setTimeout(() => statusHoerer.forEach(s => s("verbunden", "lokal")), 0);
      },
      status(f) { statusHoerer.push(f); }
    };
  }

  window.fbVerbindung = function (sitzung) {
    const E = window.FB_EINSTELLUNGEN;
    const art = new URLSearchParams(location.search).get("verbindung") || E.verbindung;
    const kanal = E.kanalVorsilbe + sitzung;
    if (art === "lokal") return lokaleVerbindung(kanal);
    return ntfyVerbindung(kanal, E.ntfyServer);
  };
})();
