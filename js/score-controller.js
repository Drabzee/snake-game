import { highscoreAudio } from "./audio.js";

const scoreDom = document.querySelector('.score');

function Score() {
    this.score = 0;
    this.updateAndRenderScore = () => {
        this.score++;
        console.log(this.score, this.highScore);
        if(this.score === this.highScore) {
            highscoreAudio.play();
        }
        scoreDom.innerText = `${this.score} / ${this.highScore > this.score ? this.highScore : this.score}`;
    };
    this.setHighscore = () => window.localStorage.setItem('highscore', this.score);
    this.initializeScore = () => {
        this.highScore = parseInt(window.localStorage.getItem('highscore')) ?? 0;
        this.score = 0;
        scoreDom.innerText = `0 / ${this.highScore}`;
    }
}

const score = new Score();

export default score;