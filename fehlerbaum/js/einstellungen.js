// Einstellungen für den digitalen Fehlerbaum.
// Nur hier ändern, wenn später ein anderer Dienst genutzt wird.
window.FB_EINSTELLUNGEN = {
  // "ntfy"  = über ntfy.sh (mehrere Geräte, braucht Internet)
  // "lokal" = nur in diesem Browser (mehrere Tabs, zum Ausprobieren ohne Internet)
  // Kann pro Aufruf mit ?verbindung=lokal überschrieben werden.
  verbindung: "ntfy",

  // Server für ntfy. Später ggf. ein eigener ntfy-Server der Schule.
  ntfyServer: "https://ntfy.sh",

  // Vorsilbe für den Kanalnamen (Kanal = Vorsilbe + Sitzungscode)
  kanalVorsilbe: "kfz-fehlerbaum-"
};
