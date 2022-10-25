import { updateSnakePositionInMovingDirection, renderSnakeForPosition, resetSnakePositionAndDirection } from './snake-controller.js';
import { gameState, resetSpeed, speed, toggleGameState } from './states.js';
import { renderFoodAtPosition, resetFoodPosition } from './food-controller.js';
import { endAudio } from './audio.js';

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
    resetSpeed();
    toggleGameState();
    resetSnakePositionAndDirection();
    resetFoodPosition();
}

document.addEventListener('keydown', (e) => {
    if(e.key === ' ') {
        toggleGameState();
        window.requestAnimationFrame(initializeGame);
    }
});

resetSnakePositionAndDirection();
renderSnakeForPosition();