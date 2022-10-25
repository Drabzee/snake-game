const basePath = location.host === 'drabzee.github.io'
                  ? 'https://raw.githubusercontent.com/drabzee/snake-game/main'
                  : '..'

export const startAudio = new Audio(basePath + '/audio/game_start.mp3');
export const endAudio = new Audio(basePath + '/audio/game_over.mp3');
export const pauseAudio = new Audio(basePath + '/audio/game_pause.mp3');
export const highscoreAudio = new Audio(basePath + '/audio/highscore.mp3');