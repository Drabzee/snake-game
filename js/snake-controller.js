import boardDOM, { totalBlockX, totalBlockY } from './initialize-board.js';
import { BLOCK_SIZE } from './constants.js';
import { gameState, incrementSpeed } from './states.js';
import { checkForFoodConsumption } from './food-controller.js'
import { finishGameAndResetState } from './main.js';
import Score from './score-controller.js';
import { playEatAudio } from './audio.js';

const centerCoordinates = {x: Math.ceil(totalBlockX/2), y: Math.ceil(totalBlockY/2)};

export let snakePosition = null;
let snakeMovingDirection = null;
let latestSnakeMovingDirection = null;

const getCorrectGridPositionForPosition = ({x, y}) => {
    if(x === 0) {
        x = totalBlockX;
    } else if(x === totalBlockX + 1) {
        x = 1;
    }

    if(y === 0) {
        y = totalBlockY;
    } else if(y === totalBlockY + 1) {
        y = 1;
    }

    return { x, y };
}

export const updateSnakePositionInMovingDirection = () => {
    snakeMovingDirection = latestSnakeMovingDirection;

    for(let i = snakePosition.length-1 ; i > 0 ; i--) {
        snakePosition[i] = { ...snakePosition[i-1] };
    }

    snakePosition[0] = getCorrectGridPositionForPosition({
        x: snakePosition[0].x + snakeMovingDirection.x,
        y: snakePosition[0].y + snakeMovingDirection.y
    });

    if(checkForFoodConsumption()) {
        playEatAudio();
        Score.updateAndRenderScore();
        incrementSpeed();
        increaseSnakeLength();
    } else if(checkForCollision()) {
        Score.setHighscore();
        finishGameAndResetState();
        return;
    }

    renderSnakeForPosition();
}

const checkForCollision = () => {
    for(let i = 1 ; i < snakePosition.length ; i++) {
        if(snakePosition[i].x === snakePosition[0].x && snakePosition[i].y === snakePosition[0].y) {
            return true;
        }
    }

    return false;
}

const increaseSnakeLength = () => {
    const length = snakePosition.length;
    const diffX = snakePosition[length - 2].x - snakePosition[length - 1].x;
    const diffY = snakePosition[length - 2].y - snakePosition[length - 1].y;
    snakePosition.push(getCorrectGridPositionForPosition({
        x: snakePosition[length - 1].x + diffX,
        y: snakePosition[length - 1].y + diffY
    }))
}

export const renderSnakeForPosition = () => {
    boardDOM.innerHTML = '';
    snakePosition.forEach((pos, index) => {
        const posDOM = document.createElement('div');
        posDOM.style.width = BLOCK_SIZE;
        posDOM.style.height = BLOCK_SIZE;
        posDOM.style.gridColumnStart = pos.x;
        posDOM.style.gridRowStart = pos.y;
        posDOM.classList.add('snake');
        posDOM.classList.add(index === 0 ? 'head' : 'body');
        boardDOM.appendChild(posDOM);
    });
}

export const resetSnakePositionAndDirection = () => {
    snakePosition = [
        { x: centerCoordinates.x, y: centerCoordinates.y },
        { x: centerCoordinates.x, y: centerCoordinates.y + 1 },
        { x: centerCoordinates.x, y: centerCoordinates.y + 2 },
    ];
    
    snakeMovingDirection = { x: 0, y: -1 };
    latestSnakeMovingDirection = snakeMovingDirection;
}

document.addEventListener('keydown', (e) => {
    if (gameState === 'RUNNING') {
        if (e.key === 'ArrowUp' && snakeMovingDirection.y !== 1) {
            latestSnakeMovingDirection = { x: 0, y: -1 };
        } else if (e.key === 'ArrowDown' && snakeMovingDirection.y !== -1) {
            latestSnakeMovingDirection = { x: 0, y: 1 };
        } else if (e.key === 'ArrowLeft' && snakeMovingDirection.x !== 1) {
            latestSnakeMovingDirection = { x: -1, y: 0 };
        } else if (e.key === 'ArrowRight' && snakeMovingDirection.x !== -1) {
            latestSnakeMovingDirection = { x: 1, y: 0 };
        }
    }
});