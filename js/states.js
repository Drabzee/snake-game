import { pauseAudio, startAudio } from "./audio.js";

export let gameState = 'PAUSED';
export const toggleGameState = () => {
    if(gameState === 'PAUSED') {
        gameState = 'RUNNING';
        startAudio.play();
    } else {
        gameState = 'PAUSED';
        pauseAudio.play();
    }
}
export const finishGameState = () => gameState = 'FINISHED';
export const startGameStart = () => gameState = 'RUNNING';


export let speed = 0;
export const incrementSpeed = () => {
    if(speed === 13) return;
    speed += 1
};
export const resetSpeed = () => speed = 0;