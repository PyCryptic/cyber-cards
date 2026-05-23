let state = {
    status: 'menu', 
    turn: 1,
    currentPlayer: 'p1', // 'p1' or 'p2'
    selectedCardInstance: null,
    players: {
        p1: { name: 'Player 1', hp: 100, maxHp: 100, bw: 10, maxBw: 10, block: 0, deck: [], hand: [], discard: [] },
        p2: { name: 'Player 2', hp: 100, maxHp: 100, bw: 10, maxBw: 10, block: 0, deck: [], hand: [], discard: [] }
    }
};

const CONSTANTS = { STARTING_HP: 100, STARTING_BW: 10, MAX_HAND: 5, DECK_SIZE: 25 };
const generateId = () => Math.random().toString(36).substr(2, 9);

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function addLog(message) {
    const logEl = document.getElementById('action-log');
    const entry = document.createElement('div');
    const color = state.currentPlayer === 'p1' ? 'text-cyan-400' : 'text-orange-400';
    entry.className = `p-2 rounded border border-gray-800 bg-black/50 font-mono mb-2 text-gray-300`;
    entry.innerHTML = `<span class="${color}">[${state.players[state.currentPlayer].name}]</span> ${message}`;
    logEl.prepend(entry);
    if(logEl.children.length > 20) logEl.removeChild(logEl.lastChild);
}

// Get active player and opponent objects dynamically
const getActive = () => state.players[state.currentPlayer];
const getOpponent = () => state.players[state.currentPlayer === 'p1' ? 'p2' : 'p1'];

function startGame() {
    state.players.p1 = { name: 'Player 1', hp: CONSTANTS.STARTING_HP, maxHp: CONSTANTS.STARTING_HP, bw: CONSTANTS.STARTING_BW, maxBw: CONSTANTS.STARTING_BW, block: 0, deck: [], hand: [], discard: [] };
    state.players.p2 = { name: 'Player 2', hp: CONSTANTS.STARTING_HP, maxHp: CONSTANTS.STARTING_HP, bw: CONSTANTS.STARTING_BW, maxBw: CONSTANTS.STARTING_BW, block: 0, deck: [], hand: [], discard: [] };
    state.turn = 1;
    state.currentPlayer = 'p1';
    state.selectedCardInstance = null;
    document.getElementById('action-log').innerHTML = '';

    // Generate Decks for both players
    ['p1', 'p2'].forEach(p => {
        let initialDeck = [];
        for(let i=0; i < CONSTANTS.DECK_SIZE; i++) {
            const randomCard = CARD_DB[Math.floor(Math.random() * CARD_DB.length)];
            initialDeck.push({ ...randomCard, instanceId: generateId() });
        }
        state.players[p].deck = shuffleArray(initialDeck);
        // Draw initial hand of 3 for both
        for(let i=0; i<3; i++) state.players[p].hand.push(state.players[p].deck.pop());
    });

    document.getElementById('view-menu').classList.add('hidden');
    document.getElementById('view-gameover').classList.add('hidden');
    document.getElementById('view-game').classList.remove('hidden');
    document.getElementById('view-game').classList.add('flex');

    addLog('System Online. Local PvP protocol initiated.');
    startTurn();
}

function drawCards(amount) {
    const player = getActive();
    for(let i=0; i < amount; i++) {
        if(player.hand.length >= CONSTANTS.MAX_HAND) {
            addLog('Hand full. Cannot draw.');
            break;
        }
        if(player.deck.length === 0) {
            if(player.discard.length === 0) break;
            addLog('Reshuffling discard pile...');
            player.deck = shuffleArray(player.discard);
            player.discard = [];
        }
        player.hand.push(player.deck.pop());
    }
    updateUI();
}

function triggerPassTurn() {
    deselectCard();
    document.getElementById('view-game').classList.add('blur-md');
    document.getElementById('view-pass').classList.remove('hidden');
    
    // Switch active player
    state.currentPlayer = state.currentPlayer === 'p1' ? 'p2' : 'p1';
    
    document.getElementById('pass-desc').innerText = `Pass device to ${state.players[state.currentPlayer].name}`;
    
    // Increment Turn counter when it gets back to p1
    if(state.currentPlayer === 'p1') state.turn++;
}

function unlockTerminal() {
    document.getElementById('view-pass').classList.add('hidden');
    document.getElementById('view-game').classList.remove('blur-md');
    startTurn();
}

function startTurn() {
    const player = getActive();
    player.bw = CONSTANTS.STARTING_BW; // Reset BW
    player.block = 0; // Reset Block at start of YOUR turn
    
    const pColor = state.currentPlayer === 'p1' ? 'text-cyan-500' : 'text-orange-500';
    const indicator = document.getElementById('turn-indicator');
    indicator.innerText = `${player.name} Turn (T${state.turn})`;
    indicator.className = `absolute top-10 text-2xl font-bold font-mono tracking-[0.5em] uppercase opacity-50 ${pColor}`;
    
    drawCards(2);
    updateUI();
}

function selectCard(instanceId) {
    if(state.selectedCardInstance === instanceId) {
        deselectCard();
        return;
    }
    
    state.selectedCardInstance = instanceId;
    const player = getActive();
    const card = player.hand.find(c => c.instanceId === instanceId);
    
    const actionArea = document.getElementById('action-area');
    const details = document.getElementById('action-card-details');
    const playBtn = document.getElementById('btn-play-card');
    
    details.innerHTML = `
        <h3 class="text-2xl font-bold text-cyan-400 font-mono mb-2 uppercase">${card.name}</h3>
        <p class="text-gray-400 text-sm font-mono mb-3">${card.desc}</p>
        <div class="inline-block bg-fuchsia-900/50 text-fuchsia-300 px-3 py-1 rounded border border-fuchsia-500 font-mono text-sm font-bold">
            Cost: ${card.cost} BW
        </div>
    `;
    
    if(player.bw < card.cost) {
        playBtn.disabled = true;
        playBtn.innerHTML = 'Insufficient BW';
    } else {
        playBtn.disabled = false;
        playBtn.innerHTML = 'Execute Payload';
    }
    
    actionArea.classList.remove('hidden');
    setTimeout(() => actionArea.classList.remove('scale-95'), 10);
    updateHandUI();
}

function deselectCard() {
    state.selectedCardInstance = null;
    const actionArea = document.getElementById('action-area');
    actionArea.classList.add('scale-95');
    setTimeout(() => actionArea.classList.add('hidden'), 200);
    updateHandUI();
}

function playSelectedCard() {
    const cardId = state.selectedCardInstance;
    if(!cardId) return;

    const active = getActive();
    const opp = getOpponent();
    const cardIndex = active.hand.findIndex(c => c.instanceId === cardId);
    const card = active.hand[cardIndex];

    if(active.bw < card.cost) return;

    active.bw -= card.cost;
    active.hand.splice(cardIndex, 1);
    active.discard.push(card);
    deselectCard();
    
    addLog(`Executed: ${card.name}`);

    // Damage logic
    if(card.damage) {
        let remainingDmg = card.damage;
        if(card.effect !== 'pierce' && opp.block > 0) {
            const absorbed = Math.min(opp.block, remainingDmg);
            opp.block -= absorbed;
            remainingDmg -= absorbed;
        }
        if(remainingDmg > 0) {
            opp.hp = Math.max(0, opp.hp - remainingDmg);
        }
    }

    // Block logic
    if(card.block) active.block += card.block;

    // Effects
    if(card.effect) {
        switch(card.effect) {
            case 'draw_1': drawCards(1); break;
            case 'draw_3': drawCards(3); break;
            case 'heal_5': active.hp = Math.min(active.maxHp, active.hp + 5); break;
            case 'gain_bw_3': active.bw += 3; break;
            case 'pierce': break; // Handled in damage logic
            case 'ultimate': 
                active.hp = Math.min(active.maxHp, active.hp + 20);
                opp.hp = Math.max(0, opp.hp - 20);
                break;
            case 'lifesteal_10':
                opp.hp = Math.max(0, opp.hp - 10);
                active.hp = Math.min(active.maxHp, active.hp + 10);
                break;
            case 'discard_enemy':
                if(opp.hand.length > 0) {
                    const discardIdx = Math.floor(Math.random() * opp.hand.length);
                    opp.discard.push(opp.hand.splice(discardIdx, 1)[0]);
                    addLog('Opponent data corrupted (discarded 1 card).');
                }
                break;
        }
    }

    updateUI();
    checkWinCondition();
}

function updateUI() {
    const active = getActive();
    const opp = getOpponent();

    // Active (Bottom) UI
    document.getElementById('bottom-name').innerText = active.name;
    document.getElementById('bottom-health-text').innerText = `${active.hp} / ${active.maxHp}`;
    document.getElementById('bottom-health-bar').style.width = `${Math.max(0, (active.hp / active.maxHp) * 100)}%`;
    document.getElementById('bottom-bw-text').innerText = `${active.bw} / ${active.maxBw}`;
    document.getElementById('bottom-bw-bar').style.width = `${Math.min(100, Math.max(0, (active.bw / active.maxBw) * 100))}%`;
    
    const bBlockEl = document.getElementById('bottom-block-display');
    if(active.block > 0) {
        bBlockEl.classList.remove('hidden');
        document.getElementById('bottom-block').innerText = active.block;
    } else { bBlockEl.classList.add('hidden'); }

    document.getElementById('deck-count').innerText = active.deck.length;
    document.getElementById('discard-count').innerText = active.discard.length;

    // Opponent (Top) UI
    document.getElementById('top-name').innerText = opp.name;
    document.getElementById('top-health-text').innerText = `${opp.hp} / ${opp.maxHp}`;
    document.getElementById('top-health-bar').style.width = `${Math.max(0, (opp.hp / opp.maxHp) * 100)}%`;
    
    const tBlockEl = document.getElementById('top-block-display');
    if(opp.block > 0) {
        tBlockEl.classList.remove('hidden');
        document.getElementById('top-block').innerText = opp.block;
    } else { tBlockEl.classList.add('hidden'); }

    updateHandUI();
}

function checkWinCondition() {
    if(state.players.p1.hp <= 0 || state.players.p2.hp <= 0) {
        const winner = state.players.p1.hp <= 0 ? 'Player 2' : 'Player 1';
        endGame(winner);
        return true;
    }
    return false;
}

function endGame(winnerName) {
    state.status = 'gameover';
    const goView = document.getElementById('view-gameover');
    document.getElementById('gameover-title').innerText = `${winnerName} Wins!`;
    goView.classList.remove('hidden');
    goView.classList.add('flex');
}

function returnToMenu() {
    document.getElementById('view-gameover').classList.add('hidden');
    document.getElementById('view-gameover').classList.remove('flex');
    document.getElementById('view-game').classList.add('hidden');
    document.getElementById('view-game').classList.remove('flex');
    document.getElementById('view-menu').classList.remove('hidden');
    state.status = 'menu';
}

function getRarityStyle(rarity) {
    switch(rarity) {
        case RARITY.COMMON: return 'border-gray-500 bg-gray-800 text-gray-300';
        case RARITY.RARE: return 'border-blue-500 bg-blue-900/40 text-blue-300';
        case RARITY.EPIC: return 'border-purple-500 bg-purple-900/40 text-purple-300';
        case RARITY.LEGENDARY: return 'border-yellow-500 bg-yellow-900/40 text-yellow-300';
        default: return 'border-gray-500 bg-gray-800';
    }
}

function getTypeColor(type) {
    switch(type) {
        case TYPES.ATTACK: return 'text-red-400';
        case TYPES.DEFENSE: return 'text-cyan-400';
        case TYPES.SPECIAL: return 'text-fuchsia-400';
        default: return 'text-gray-300';
    }
}

function updateHandUI() {
    const handContainer = document.getElementById('player-hand');
    handContainer.innerHTML = '';
    const active = getActive();
    const numCards = active.hand.length;
    
    if(numCards === 0) {
        handContainer.innerHTML = '<div class="h-full w-full flex items-center justify-center text-gray-600 border-2 border-dashed border-gray-800 rounded-xl font-mono uppercase tracking-widest text-sm">Hand Empty</div>';
        return;
    }

    active.hand.forEach((card, index) => {
        const middle = (numCards - 1) / 2;
        const offset = index - middle;
        const rotation = offset * 4;
        const yOffset = Math.abs(offset) * 12;

        const isSelected = state.selectedCardInstance === card.instanceId;
        const isPlayable = active.bw >= card.cost;
        
        const cardEl = document.createElement('div');
        let classes = `cyber-card relative w-36 h-48 md:w-40 md:h-56 rounded-xl flex flex-col p-2 md:p-3 border-2 origin-bottom transition-all duration-300 ${getRarityStyle(card.rarity)}`;
        
        if(isSelected) {
            classes += ` selected`;
            cardEl.style.transform = `rotate(0deg) translateY(-30px)`;
            cardEl.style.zIndex = 60;
        } else {
            cardEl.style.transform = `rotate(${rotation}deg) translateY(${yOffset}px)`;
            cardEl.style.zIndex = index + 10;
        }

        if(!isPlayable && !isSelected) classes += ` disabled`;

        cardEl.className = classes;
        cardEl.onclick = () => selectCard(card.instanceId);

        cardEl.innerHTML = `
            <div class="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:10px_10px] rounded-xl pointer-events-none"></div>
            <div class="flex justify-between items-start z-10 relative mb-2">
                <span class="bg-fuchsia-900/80 text-fuchsia-200 text-xs font-bold px-2 py-1 rounded-br-lg rounded-tl-lg border border-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.5)] font-mono">
                    ${card.cost} BW
                </span>
                <i class="fas ${card.icon} text-2xl ${getTypeColor(card.type)} opacity-80"></i>
            </div>
            <div class="flex-grow flex flex-col items-center justify-center text-center z-10 relative">
                <h3 class="font-mono font-bold text-xs md:text-sm text-gray-100 mb-1 leading-tight uppercase">${card.name}</h3>
                <div class="text-[0.6rem] uppercase tracking-widest font-bold ${getTypeColor(card.type)}">${card.type}</div>
            </div>
            <div class="mt-auto z-10 relative bg-black/60 p-1.5 md:p-2 rounded border border-gray-700/50">
                <div class="flex justify-between font-mono text-[0.6rem] md:text-xs font-bold">
                    ${card.damage ? `<span class="text-red-400">ATK: ${card.damage}</span>` : '<span></span>'}
                    ${card.block ? `<span class="text-cyan-400">DEF: ${card.block}</span>` : '<span></span>'}
                </div>
            </div>
        `;
        handContainer.appendChild(cardEl);
    });
}