import boardDOM, { totalBlockX, totalBlockY } from './initialize-board.js';
import { BLOCK_SIZE } from './constants.js';
import { snakePosition } from './snake-controller.js';
import { gameState } from './states.js';

export let foodPosition = null;

const checkForConflictingPosition = () => {
    for (const snakePos of snakePosition) {
        if(foodPosition.x === snakePos.x && foodPosition.y === snakePos.y)
            return true;
    }
    return false;
}

export const updateFoodPositionAtRandom = () => {
    while(true) {
        foodPosition = {
            x: Math.floor((Math.random() * totalBlockX) + 1),
            y: Math.floor((Math.random() * totalBlockY) + 1)
        }
        if(!checkForConflictingPosition()) break;
    }
    renderFoodAtPosition();
}

export const checkForFoodConsumption = () => {
    if(foodPosition === null) return false;

    if(foodPosition.x === snakePosition[0].x && foodPosition.y === snakePosition[0].y) {
        return true;
    }

    return false;
}

export const renderFoodAtPosition = () => {
    if(gameState === 'PAUSED' && foodPosition === null) return;

    if(foodPosition === null || checkForFoodConsumption()) {
        updateFoodPositionAtRandom();
    }

    const foodDOM = document.createElement('div');
    foodDOM.style.width = BLOCK_SIZE;
    foodDOM.style.height = BLOCK_SIZE;
    foodDOM.style.gridColumnStart = foodPosition.x;
    foodDOM.style.gridRowStart = foodPosition.y;
    foodDOM.classList.add('food');
    boardDOM.appendChild(foodDOM);
}

export const resetFoodPosition = () => {
    foodPosition = null;
}