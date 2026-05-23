# Cyber Cards - Operations Manual & README

## 📖 Projektübersicht
**Cyber Cards** ist ein rundenbasiertes 1v1 Hotseat-Kartenspiel im Cyberpunk- und Hacker-Design. Zwei Spieler treten am selben Gerät gegeneinander an, um die Server-Integrität des Gegners auf 0 zu reduzieren.

---

## 🚀 Deployment & Ausführung
Das Spiel erfordert kein Backend und läuft komplett clientseitig.

1. Erstelle eine neue Datei namens `cybercards.html`.
2. Füge den kompletten generierten Code (HTML, CSS, JS) ein.
3. Öffne die Datei direkt in einem modernen Browser.
> **Hinweis zu Dependencies:** Es wird eine aktive Internetverbindung benötigt, da das Styling (Tailwind CSS) und die UI-Icons (FontAwesome) zur Laufzeit über externe CDNs geladen werden.

---

## 🎯 Spielziel (System Compromise)
Bringe die **Integrity** (Lebenspunkte) des gegnerischen Servers auf 0, bevor dein eigenes System lahmgelegt wird. Wer als Erster das gegnerische System hackt, gewinnt.

---

## 💻 Kernressourcen

| Ressource | Beschreibung |
| :--- | :--- |
| **Integrity (Leben)** | Deine Systemgesundheit. Startwert ist 30. Fällt dieser Wert auf 0, ist das System kompromittiert und das Spiel endet. |
| **Bandwidth (Energie)** | Deine Aktionspunkte. Du startest jeden Zug mit 10 Bandbreite. Jede gespielte Karte verbraucht einen Teil davon. |
| **Firewall (Block)** | Ein temporärer Schild, der gegnerischen Schaden abfängt. *Wichtig: Die Firewall hält nur für den gegnerischen Zug und wird zu Beginn deines nächsten Zuges auf 0 gesetzt!* |

---

## 🃏 Kartentypen

*   🔴 **Attack (Angriff):** Verursacht direkten Schaden. Trifft immer zuerst die gegnerische Firewall. Ist diese auf 0, wird die Integrity direkt angegriffen. 
    * *Beispiele:* DDoS, SQL Injection, Logic Bomb.
*   🔵 **Defense (Verteidigung):** Erhöht deine lokale Firewall, um das System gegen den nächsten Zug des Gegners abzusichern.
    * *Beispiele:* Proxy Server, VPN.
*   🟣 **Special (Spezial):** Komplexe Skripte, die das Gameplay manipulieren. Sie können dir temporär Ressourcen zurückgeben, dich Karten ziehen lassen oder den Gegner sabotieren.
    * *Beispiele:* Root Access, Botnet, Ransomware.

---

## 🔄 Spielablauf (Hotseat-Modus)

Da das Spiel lokal zu zweit an einem Bildschirm gespielt wird, gibt es einen Lock-Screen, um die Handkarten vor dem Mitspieler zu verbergen.

1. **Zug-Start:** Das System weist dir automatisch 10 Bandbreite zu und du ziehst Karten von deinem Deck.
2. **Aktionsphase:**
    * Klicke auf eine Karte in deiner Hand, um sie ins Terminal zu laden.
    * Klicke auf **"Execute Payload"**, um das Skript auszuführen. Die Bandbreiten-Kosten werden sofort abgezogen.
    * Du kannst so viele Karten spielen, wie deine Bandbreite zulässt.
3. **Zug-Ende:** Wenn du alle Aktionen ausgeführt hast, klicke unten rechts auf **"End Turn"**.
4. **Terminal Lock:** Das Spielfeld wird durch einen Privacy-Screen gesperrt.
5. **Systemübergabe:** Gib die Maus oder das Gerät an den zweiten Spieler weiter.
6. **Terminal Unlock:** Spieler 2 klickt auf **"Terminal entsperren"**, zieht seine Karten und beginnt seinen Zug.

---
*Happy Hacking.*