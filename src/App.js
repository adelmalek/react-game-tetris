import React from 'react';
import './App.css';

import GameBoard from './Components/GameBoard/GameBoard';
import GameStats from './Components/GameStats/GameStats';
import Options from './Components/Options/Options';
import Score from './Components/Score/Score';

import TETROMINO_SHAPES from './Constans/tetrominos';

const BOARD_HEIGHT = 20;
const BOARD_WIDTH = 10;

class App extends React.Component {
  createEmptyBoard() {
    return new Array(BOARD_HEIGHT).fill(null).map( (_) => new Array(BOARD_WIDTH).fill(null));
  }

  getRandomTetrominoShape() {
    const shape = ['I', 'O', 'J', 'L', 'S', 'Z', 'T'];
    const index = Math.floor(Math.random() * 7);
    return shape[index];
  }

  state = {
    gameStarted: false,
    gameOver: false,
    paused: false,
    score: 0,
    board: this.createEmptyBoard(),
    currentRotationIndex: 0,
    rowIndex: 0,
    colIndex: 4,
    currentShape: null,
    nextShape: null
  }

  startGame = () => {
    this.setState({
      gameStarted: true,
      gameOver: false,
      paused: false,
      score: 0,
      currentRotationIndex: 0,
      rowIndex: 0,
      colIndex: 4,
      board: this.createEmptyBoard(),
      currentShape: this.getRandomTetrominoShape(),
      nextShape: this.getRandomTetrominoShape()
    })
  }

  togglePause = () => {
    this.setState({
      paused: !this.state.paused
    })
  }

  getCurrentCoordinates(
    rotationOffset=0,
    currentShapeIndex=this.state.currentShape,
    currentRotationIndex=this.state.currentRotationIndex,
    rowIndex=this.state.rowIndex,
    colIndex=this.state.colIndex
  ) {
    const currentShape = TETROMINO_SHAPES[currentShapeIndex];
    if (typeof currentShape === 'undefined') {
      return [];
    }

    const currentRotation = currentShape[(currentRotationIndex + rotationOffset) % currentShape.length];

    const coordinates = [];
    for (let i = 0; i < currentRotation.length; i++) {
      for (let j = 0; j < currentRotation[i].length; j++) {
        if (currentRotation[i][j]) {
          coordinates.push({
            row: rowIndex + i,
            col: colIndex + j
          })
        }
      }
    };
    
    return coordinates;
  }

  getBoardContent() {
    const deepClone = (x) => JSON.parse(JSON.stringify(x));
    const dynamicBoard = deepClone(this.state.board);

    if (this.state.gameStarted && !this.state.gameOver) {
      for (let {row, col} of this.getCurrentCoordinates()) {
        dynamicBoard[row][col] = this.state.currentShape;
      }
    }

    return dynamicBoard;
  }

  render() {
    return (
      <div className="App">
        <h1 className='header'>Tetris {this.state.gameOver? '(GAME OVER)' :  ''}</h1>
        <GameBoard board={this.getBoardContent()}/>
        <Options onStart={this.startGame} onPause={this.togglePause}/>
        <GameStats />
        <Score score={this.state.score}/>
      </div>
    );
  }
}

export default App;
