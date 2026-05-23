# Cyber Cards - Operations Manual & README

## 📖 Projektübersicht
**Cyber Cards** ist ein rundenbasiertes 1v1 Hotseat-Kartenspiel im Cyberpunk- und Hacker-Design. Zwei Spieler treten am selben Gerät gegeneinander an, um die Server-Integrität des Gegners auf 0 zu reduzieren. 

---

## 🛠️ Tech Stack & Architecture

Dieses Projekt wurde bewusst leichtgewichtig und ohne große Frameworks gebaut, um direkte DOM-Manipulation und sauberes State-Management in nativem JavaScript zu demonstrieren.

*   **Frontend:** HTML5, Vanilla JavaScript (ES6+)
*   **Styling:** Tailwind CSS (via CDN für schnelles Prototyping)
*   **Icons & Fonts:** FontAwesome & Google Fonts (Fira Code / Roboto Mono)

### System-Architektur
Der Code ist modular nach dem "Separation of Concerns"-Prinzip aufgebaut:
*   `index.html`: Beinhaltet ausschließlich die UI-Struktur und View-Container.
*   `js/cards.js`: Fungiert als statische Datenbasis (Data Layer). Hier sind alle Karten, Effekte und Rarity-Tiers als JSON-ähnliche Objekte definiert.
*   `js/game.js`: Beinhaltet die Core-Loop, das State-Management und die DOM-Updates (Business Logic).

### Design-Philosophie
Das Interface ist von klassischen Terminals und modernen Cyberpunk-UIs inspiriert. Es nutzt CSS-Grid/Flexbox für responsive Layouts und CSS-Transitions für performante, karten-spezifische Hover-Effekte.

---

## 🚀 Deployment & Ausführung
Das Spiel erfordert kein Backend und läuft komplett clientseitig.

1. Klone das Repository.
2. Öffne die `index.html` direkt in einem modernen Browser (oder nutze den Live-Server).
> **Hinweis zu Dependencies:** Es wird eine aktive Internetverbindung benötigt, da das Styling (Tailwind) und die UI-Icons zur Laufzeit über externe CDNs geladen werden.

---

## 🎯 Spielziel (System Compromise)
Bringe die **Integrity** (Lebenspunkte) des gegnerischen Servers auf 0, bevor dein eigenes System lahmgelegt wird. Wer als Erster das gegnerische System hackt, gewinnt.

---

## 💻 Kernressourcen

| Ressource | Beschreibung |
| :--- | :--- |
| **Integrity (Leben)** | Deine Systemgesundheit. Startwert ist 100. Fällt dieser Wert auf 0, ist das System kompromittiert. |
| **Bandwidth (Energie)** | Deine Aktionspunkte. Du startest jeden Zug mit 10 Bandbreite. Jede Karte verbraucht einen Teil davon. |
| **Firewall (Block)** | Ein temporärer Schild, der gegnerischen Schaden abfängt. *Hält nur für einen Zug und wird danach zurückgesetzt!* |

---

## 🃏 Kartentypen

*   🔴 **Attack (Angriff):** Verursacht direkten Schaden. Trifft immer zuerst die gegnerische Firewall.
*   🔵 **Defense (Verteidigung):** Erhöht deine lokale Firewall, um das System gegen den nächsten Zug des Gegners abzusichern.
*   🟣 **Special (Spezial):** Komplexe Skripte (Karten ziehen, Bandbreite generieren, Gegner sabotieren).

---

## 🔄 Spielablauf (Hotseat-Modus)

Das Spiel wird lokal zu zweit an einem Bildschirm gespielt. Es gibt einen Lock-Screen, um Handkarten vor dem Mitspieler zu verbergen.

1. **Zug-Start:** Das System weist dir Bandbreite zu und du ziehst 2 Karten.
2. **Aktionsphase:** Wähle eine Karte und klicke auf **"Execute Payload"**. Du kannst so viele Karten spielen, wie deine Bandbreite zulässt.
3. **Zug-Ende:** Klicke unten rechts auf **"End Turn"**.
4. **Terminal Lock:** Das Spielfeld wird durch einen Privacy-Screen gesperrt. Gib das Gerät an Spieler 2 weiter.
5. **Terminal Unlock:** Spieler 2 entsperrt das Terminal und beginnt seinen Zug.

---

## 🗺️ Roadmap & Future Development

Die aktuelle Architektur ist als skalierbares Fundament konzipiert. Folgende Erweiterungen sind geplant:

### Phase 1: Immersion & Polish
- [ ] **Sound-Engine:** Integration von synthetischen UI-Sounds und Alarmen.
- [ ] **Visual Effects:** Glitch-Effekte bei Treffern.
- [ ] **Mobile Responsiveness:** Optimierung des Karten-Handlings für Touch-Displays.

### Phase 2: Advanced Gameplay
- [ ] **Deck Builder:** Pre-Game-Menü zur eigenen Deck-Kompilierung.
- [ ] **Neue Mechaniken:** "Trap Cards" und Kartenfusionen.
- [ ] **Erweiterte Datenbank:** Hinzufügen von neuen Skripten und Malware.

### Phase 3: Network Protocol (Online Multiplayer)
- [ ] **Backend-Integration:** Aufbau eines Node.js / Socket.io Backends.
- [ ] **Lobby-System:** Private Sessions mittels verschlüsselter Room-Codes.

---
*Happy Hacking.*
