import { updateSnakePositionInMovingDirection, renderSnakeForPosition, resetSnakePositionAndDirection } from './snake-controller.js';
import { gameState, resetSpeed, speed, toggleGameState } from './states.js';
import { renderFoodAtPosition, resetFoodPosition } from './food-controller.js';
import { endAudio } from './audio.js';
import Score from './score-controller.js';

let prevTimestamp = 0;
let speedBuffer = 20;
let initialRefreshRate = 300;
let currentRefreshRate = initialRefreshRate;

const initializeGame = (timestamp) => {
    let elapsed = (timestamp - prevTimestamp);
    if(elapsed > currentRefreshRate) {
        updateSnakePositionInMovingDirection();
        renderFoodAtPosition();
        
        currentRefreshRate = initialRefreshRate - (speed * speedBuffer);
        prevTimestamp = timestamp;
    }
    
    if(gameState === 'RUNNING')
        window.requestAnimationFrame(initializeGame);
}

export const finishGameAndResetState = () => {
    endAudio.play();
    displayOrHideOverlayWithMessage(true, 'OOUCH!!!');
    Score.initializeScore();
    resetSpeed();
    toggleGameState();
    resetSnakePositionAndDirection();
    resetFoodPosition();
}

const displayOrHideOverlayWithMessage = (toShow, msg = null) => {
    const overlayDom = document.querySelector('.overlay');
    overlayDom.innerHTML = '';
    if(!toShow) {
        overlayDom.style.display = 'none';
        return;
    }
    const headingDom = document.createElement('h1');
    headingDom.innerText = msg;
    overlayDom.appendChild(headingDom);
    overlayDom.style.display = 'flex';
}


document.addEventListener('keydown', (e) => {
    if(e.key === ' ') {
        toggleGameState();
        if(gameState === 'RUNNING') displayOrHideOverlayWithMessage(false);
        else displayOrHideOverlayWithMessage(true, 'PAUSED')
        window.requestAnimationFrame(initializeGame);
    }
});

resetSnakePositionAndDirection();
renderSnakeForPosition();
displayOrHideOverlayWithMessage(true, 'Press spacebar to begin the adventure');
Score.initializeScore();