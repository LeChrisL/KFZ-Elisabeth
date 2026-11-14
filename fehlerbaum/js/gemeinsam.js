// Gemeinsame Hilfsfunktionen für Masteransicht, Gruppenkarte und QR-Seite.
(function () {
  "use strict";

  const P = new URLSearchParams(location.search);

  window.fb = {
    param(name, standard) { const w = P.get(name); return w === null ? standard : w; },

    // Sitzungscode: 6 Zeichen ohne verwechselbare Zeichen (0/O, 1/l/I)
    neuerCode() {
      const z = "abcdefghjkmnpqrstuvwxyz23456789";
      const a = new Uint32Array(6);
      crypto.getRandomValues(a);
      return Array.from(a, x => z[x % z.length]).join("");
    },

    instanzId() { return Math.random().toString(36).slice(2, 10); },

    async ladeBaum(id) {
      if (!/^[a-z0-9_-]+$/i.test(id)) throw new Error("Ungültiger Baum-Name");
      const r = await fetch("baeume/" + id + ".json", { cache: "no-cache" });
      if (!r.ok) throw new Error("Konfiguration „" + id + "“ nicht gefunden");
      return r.json();
    },

    stationen(baum) {
      const b = baum.bloecke.find(x => x.typ === "stationen");
      return b ? b : { karten: [], tische: ["A"] };
    },

    schluessel(nr, tisch) { return "s" + nr + tisch; },

    esc(t) {
      return String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    },

    // Lückensatz als HTML für die Masteransicht. Leere Lücken bleiben als Strich sichtbar.
    satzHTML(station, werte) {
      werte = werte || {};
      return station.satz.map(teil => {
        if (typeof teil === "string") return "<span class='fest'>" + fb.esc(teil) + "</span>";
        if (teil.wahl) {
          return teil.optionen.map(o => {
            const an = werte[teil.wahl] === o;
            return "<span class='wahl" + (an ? " an" : "") + "'>" + (an ? "☒" : "☐") + " " + fb.esc(o) + "</span>";
          }).join(" ");
        }
        const w = (werte[teil.feld] || "").trim();
        return w ? "<span class='luecke voll'>" + fb.esc(w) + "</span>" : "<span class='luecke leer'>_____</span>";
      }).join("");
    },

    farbenSetzen(baum) {
      const f = baum.farben || {};
      const r = document.documentElement.style;
      if (f.symptom) r.setProperty("--symptom", f.symptom);
      if (f.ursache) r.setProperty("--ursache", f.ursache);
      if (f.station) r.setProperty("--station", f.station);
      if (f.lehrkraft) r.setProperty("--lehrkraft", f.lehrkraft);
    }
  };
})();
