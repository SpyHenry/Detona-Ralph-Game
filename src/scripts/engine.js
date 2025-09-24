const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives-display"),
        startScreen: document.querySelector("#start-screen"),
        gameOverScreen: document.querySelector("#game-over-screen"),
        gameArea: document.querySelector(".panel"),
        menu: document.querySelector(".menu"),
        startButton: document.querySelector("#start-button"),
        restartButton: document.querySelector("#restart-button"),
        menuButton: document.querySelector("#menu-button"),
        finalScore: document.querySelector("#final-score"),
        gameOverTitle: document.querySelector("#game-over-title"),
        newRecord: document.querySelector("#new-record"),
        highScoresList: document.querySelector("#high-scores-list"),
        playerNameInput: document.querySelector("#player-name"),
        saveScoreButton: document.querySelector("#save-score"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
        gameState: 'menu', // 'menu', 'playing', 'gameOver'
        highScores: [],
        countdownPlayed: false,
    },
    actions: {
        timerId: null,
        countdownTimerId: null,
    }
};

// Funções do sistema de placar
function loadHighScores() {
    const saved = localStorage.getItem('detonaRalphHighScores');
    if (saved) {
        const savedScores = JSON.parse(saved);
        state.values.highScores = savedScores.map(score => {
            if (typeof score === 'number') {
                return { name: 'Anônimo', score: score };
            }
            return score;
        });
    } else {
        state.values.highScores = [
            { name: '---', score: 0 },
            { name: '---', score: 0 },
            { name: '---', score: 0 }
        ];
    }
    updateHighScoresDisplay();
}

function saveHighScores() {
    localStorage.setItem('detonaRalphHighScores', JSON.stringify(state.values.highScores));
}

function updateHighScoresDisplay() {
    const scoreItems = state.view.highScoresList.children;
    for (let i = 0; i < 3; i++) {
        const position = i + 1;
        const record = state.values.highScores[i] || { name: '---', score: 0 };
        scoreItems[i].textContent = `${position}º - ${record.name} - ${record.score} pts`;
    }
}

function checkAndUpdateHighScore(newScore) {
    let isNewRecord = false;
    const lowestScore = state.values.highScores[2]?.score || 0;
    
    if (newScore > lowestScore) {
        isNewRecord = true;
        state.values.pendingScore = newScore;
    }
    
    return isNewRecord;
}

function saveNewHighScore(playerName, score) {
    const newRecord = { 
        name: playerName.trim() || 'Anônimo', 
        score: score 
    };
    
    state.values.highScores.push(newRecord);
    state.values.highScores.sort((a, b) => b.score - a.score);
    state.values.highScores = state.values.highScores.slice(0, 3);
    
    saveHighScores();
    updateHighScoresDisplay();
    state.values.pendingScore = null;
}

function countdown() {
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;

    if (state.values.currentTime === 4 && !state.values.countdownPlayed) {
        state.values.countdownPlayed = true;
        playSound("countdown");
    }
    
    if (state.values.currentTime <= 0) {
        endGame("Tempo esgotado!", false);
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`)
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=> {
        square.classList.remove('enemy');
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitbox() {
    state.view.squares.forEach((square) => {

        const handleHit = (event) => {
            event.preventDefault();

            if (state.values.gameState !== 'playing') return;

            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("coin");

                // Aumenta velocidade a cada 5 pontos
                checkSpeedIncrease();

            } else {
                state.values.lives--;
                state.view.lives.textContent = "x" + state.values.lives;
                playSound("error");

                if (state.values.lives <= 0) {
                    endGame("Suas vidas acabaram!");
                }
            }
        };

        // Adiciona suporte a desktop e mobile
        square.addEventListener('mousedown', handleHit);   // desktop
        square.addEventListener('touchstart', handleHit); // mobile
    });
}

function endGame(message, isWin = false) {
    state.values.gameState = 'gameOver';
    clearInterval(state.actions.countdownTimerId);
    clearInterval(state.actions.timerId);
    
    // Remove Ralph das janelas
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });
    
    // Configura a tela de game over
    state.view.gameOverTitle.textContent = isWin ? "PARABÉNS!" : "GAME OVER!";
    state.view.finalScore.textContent = state.values.result;
    
    // Verifica se é um novo recorde
    const isNewRecord = checkAndUpdateHighScore(state.values.result);
    if (isNewRecord) {
        state.view.newRecord.classList.remove('hidden');
        state.view.playerNameInput.value = '';
        state.view.playerNameInput.focus();
    } else {
        state.view.newRecord.classList.add('hidden');
    }
    
    // Toca som apropriado
    playSound(isWin ? "win" : "gameover");
    
    // Mostra tela de game over
    showGameOverScreen();
}

function startGame() {
    state.values.gameState = 'playing';
    state.values.result = 0;
    state.values.currentTime = 60;
    state.values.lives = 3;
    state.values.hitPosition = 0;
    state.values.gameVelocity = 1000;

    state.values.countdownPlayed = false;
    
    // Atualiza interface
    state.view.score.textContent = state.values.result;
    state.view.timeleft.textContent = state.values.currentTime;
    state.view.lives.textContent = "x" + state.values.lives;
    
    // Remove Ralph de todas as janelas
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });
    
    // Inicia os timers
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countdownTimerId = setInterval(countdown, 1000);
    
    // Mostra a tela do jogo
    showGameScreen();
}

function showMenuScreen() {
    state.view.startScreen.style.display = 'flex';
    state.view.gameOverScreen.style.display = 'none';
    state.view.menu.style.display = 'none';
    state.view.gameArea.style.display = 'none';
}

function showGameScreen() {
    state.view.startScreen.style.display = 'none';
    state.view.gameOverScreen.style.display = 'none';
    state.view.menu.style.display = 'flex';
    state.view.gameArea.style.display = 'flex';
}

function showGameOverScreen() {
    state.view.startScreen.style.display = 'none';
    state.view.gameOverScreen.style.display = 'flex';
    state.view.menu.style.display = 'none';
    state.view.gameArea.style.display = 'none';
}

function setupEventListeners() {
    state.view.startButton.addEventListener('click', () => {
        startGame();
    });
    
    state.view.restartButton.addEventListener('click', () => {
        startGame();
    });
    
    state.view.menuButton.addEventListener('click', () => {
        state.values.gameState = 'menu';
        showMenuScreen();
    });
    
    state.view.saveScoreButton.addEventListener('click', () => {
        handleSaveScore();
    });
    
    state.view.playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSaveScore();
        }
    });
}

function handleSaveScore() {
    const playerName = state.view.playerNameInput.value;
    if (state.values.pendingScore !== null) {
        saveNewHighScore(playerName, state.values.pendingScore);
        state.view.newRecord.classList.add('hidden');
    }
}

function checkSpeedIncrease() {
    // A cada 5 pontos, aumenta a velocidade 

    if (state.values.result % 5 === 0 && state.values.result > 0) {

        const newVelocity = Math.max(300, state.values.gameVelocity - 100);
        
        if (newVelocity !== state.values.gameVelocity) {
            state.values.gameVelocity = newVelocity;
            
            clearInterval(state.actions.timerId);
            state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
            
            playSound("speedup");
            
            console.log(`Velocidade aumentada! Novo intervalo: ${state.values.gameVelocity}ms`);
        }
    }
}

function initialize() {
    addListenerHitbox();
    setupEventListeners();
    loadHighScores();
    showMenuScreen();
}

initialize();