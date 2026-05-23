const TYPES = { ATTACK: 'attack', DEFENSE: 'defense', SPECIAL: 'special' };
const RARITY = { COMMON: 'common', RARE: 'rare', EPIC: 'epic', LEGENDARY: 'legendary' };

const CARD_DB = [
    // Attacks
    { id: 'a1', name: 'DDoS Attack', type: TYPES.ATTACK, cost: 2, damage: 15, rarity: RARITY.COMMON, icon: 'fa-server', desc: 'Overloads target server with traffic.' },
    { id: 'a2', name: 'SQL Injection', type: TYPES.ATTACK, cost: 3, damage: 25, rarity: RARITY.RARE, icon: 'fa-database', desc: 'Bypasses basic data validation.' },
    { id: 'a3', name: 'Trojan Horse', type: TYPES.ATTACK, cost: 4, damage: 20, effect: 'draw_1', rarity: RARITY.EPIC, icon: 'fa-horse-head', desc: 'Deals damage and draws 1 card.' },
    { id: 'a4', name: 'Ransomware', type: TYPES.ATTACK, cost: 6, damage: 45, rarity: RARITY.LEGENDARY, icon: 'fa-lock', desc: 'Devastating encrypted attack.' },
    { id: 'a5', name: 'Logic Bomb', type: TYPES.ATTACK, cost: 3, damage: 15, effect: 'pierce', rarity: RARITY.RARE, icon: 'fa-bomb', desc: 'Damage ignores Firewall completely.' },
    { id: 'a6', name: 'Phishing', type: TYPES.ATTACK, cost: 3, damage: 10, effect: 'discard_enemy', rarity: RARITY.EPIC, icon: 'fa-fish', desc: 'Deal 10 DMG. Opponent discards 1 random card.' },
    
    // Defenses
    { id: 'd1', name: 'Basic Firewall', type: TYPES.DEFENSE, cost: 1, block: 10, rarity: RARITY.COMMON, icon: 'fa-shield-alt', desc: 'Mitigates incoming damage.' },
    { id: 'd2', name: 'VPN Routing', type: TYPES.DEFENSE, cost: 2, block: 15, effect: 'heal_5', rarity: RARITY.RARE, icon: 'fa-network-wired', desc: 'Blocks damage and restores 5 Integrity.' },
    { id: 'd3', name: 'Zero-Trust', type: TYPES.DEFENSE, cost: 4, block: 35, rarity: RARITY.EPIC, icon: 'fa-fingerprint', desc: 'Heavy defense system architecture.' },
    { id: 'd4', name: 'Honeypot', type: TYPES.DEFENSE, cost: 2, block: 10, effect: 'draw_1', rarity: RARITY.RARE, icon: 'fa-jar', desc: 'Gain 10 Firewall and draw 1 card.' },

    // Specials
    { id: 's1', name: 'Overclock', type: TYPES.SPECIAL, cost: 0, effect: 'gain_bw_3', rarity: RARITY.COMMON, icon: 'fa-microchip', desc: 'Gain 3 temporary Bandwidth.' },
    { id: 's2', name: 'Root Access', type: TYPES.SPECIAL, cost: 5, effect: 'ultimate', rarity: RARITY.LEGENDARY, icon: 'fa-terminal', desc: 'Heal 20 Integrity, Deal 20 Damage.' },
    { id: 's3', name: 'Data Siphon', type: TYPES.SPECIAL, cost: 3, effect: 'lifesteal_10', rarity: RARITY.EPIC, icon: 'fa-magnet', desc: 'Deal 10 damage, heal 10 Integrity.' },
    { id: 's4', name: 'Botnet', type: TYPES.SPECIAL, cost: 4, effect: 'draw_3', rarity: RARITY.LEGENDARY, icon: 'fa-globe-americas', desc: 'Draw 3 cards from your deck.' }
];