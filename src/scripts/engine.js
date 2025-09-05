const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector(".menu-lives h2"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,

    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countdownTimerId: setInterval(countdown, 1000),
    }

};

function countdown() {
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;
    
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countdownTimerId);
        clearInterval(state.actions.timerId);
        alert("GAME OVER! Sua pontuação final: " + state.values.result + ". Quer jogar de novo? Atualize a página!!");
        playSound("gameover")
        
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
            event.preventDefault(); // previne scroll ou comportamento padrão em mobile

            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("coin");

                if (state.values.result >= 25) {
                    endGame("Parabéns! Você venceu! " + ". Quer jogar de novo? Atualize a página!!");
                    playSound("win");
                }

            } else {
                state.values.lives--;
                state.view.lives.textContent = "x" + state.values.lives;
                playSound("error");

                if (state.values.lives <= 0) {
                    endGame("Suas vidas acabaram! Pontuação final: " + state.values.result + ". Quer jogar de novo? Atualize a página!!");
                    playSound("gameover");
                }
            }
        };

        // Adiciona suporte a desktop e mobile
        square.addEventListener('mousedown', handleHit);   // desktop
        square.addEventListener('touchstart', handleHit); // mobile
    });
}

function endGame(message) {
    clearInterval(state.actions.countdownTimerId);
    clearInterval(state.actions.timerId);
    alert(message);
    
}


function initialize() {
    addListenerHitbox();
    state.view.lives.textContent = "x" + state.values.lives;
}

initialize();