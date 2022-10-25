import { BLOCK_SIZE, GRID_GAP } from './constants.js';

const screenWidth = document.body.clientWidth;
const screenHeight = document.body.clientHeight;

export const totalBlockX = Math.floor((screenWidth * 0.8) / BLOCK_SIZE);
export const totalBlockY = Math.floor((screenHeight * 0.8) / BLOCK_SIZE);

const boardWidth = (BLOCK_SIZE * totalBlockX) + (GRID_GAP * (totalBlockX - 1));
const boardHeight = (BLOCK_SIZE * totalBlockY) + (GRID_GAP * (totalBlockY - 1));

const boardDOM = document.querySelector('.board');
boardDOM.style.width = boardWidth + 'px';
boardDOM.style.height = boardHeight + 'px';

export default boardDOM;