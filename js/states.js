import { playPauseAudio, playStartAudio } from "./audio.js";

export let gameState = 'PAUSED';
export const toggleGameState = () => {
    if(gameState === 'PAUSED') {
        gameState = 'RUNNING';
        playStartAudio();
    } else {
        gameState = 'PAUSED';
        playPauseAudio();
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