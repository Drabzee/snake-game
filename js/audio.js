const basePath = location.host === 'drabzee.github.io'
                  ? 'https://raw.githubusercontent.com/drabzee/snake-game/main'
                  : '..';

export const playStartAudio = () => (new Audio(basePath + '/audio/game_start.mp3')).play();
export const playEndAudio = () => (new Audio(basePath + '/audio/game_over.mp3')).play();
export const playPauseAudio = () => (new Audio(basePath + '/audio/game_pause.mp3')).play();
export const playHighscoreAudio = () => (new Audio(basePath + '/audio/highscore.mp3')).play();
export const playEatAudio = () => (new Audio(basePath + '/audio/eat.mp3')).play();