import React from 'react';
import './App.css';

import GameBoard from './Components/GameBoard/GameBoard';
import GameStats from './Components/GameStats/GameStats';
import Options from './Components/Options/Options';
import Score from './Components/Score/Score';

import TETROMINO_SHAPES from './Constans/tetrominos';

const BOARD_HEIGHT = 20;
const BOARD_WIDTH = 10;
const SCORE_INCREMENTS = [0, 1, 3, 6, 10];

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
    nextShape: null,
    intervalId: null
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (!this.state.gameStarted || this.state.gameOver || this.state.paused) {
        return;
      }

      if (e.key === 'ArrowUp') {
        this.rotateCurrentTetromino();
      }

      if (e.key === 'ArrowDown') {
        this.moveCurrentTetrominoDown();
      }

      if (e.key === 'ArrowLeft') {
        this.moveCurrentTetrominoLeft();
      }

      if (e.key === 'ArrowRight') {
        this.moveCurrentTetrominoRight();
      }
     })
  }

  startGame = () => {
    let newIntervalId = this.state.intervalId;

    const step = () => {
      if (!this.state.paused) {
        this.moveCurrentTetrominoDown();
      }
    }

    if (this.state.intervalId === null) {
      newIntervalId = setInterval(step, 1000)
    }

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
      nextShape: this.getRandomTetrominoShape(),
      intervalId: newIntervalId
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

  getNextItemContent() {
    const board = new Array(3).fill(null).map( (_) => new Array(4).fill(0));
    const coordinates = this.getCurrentCoordinates(0, this.state.nextShape, 0, 0, 0);

    if (this.state.gameStarted && !this.state.gameOver) {
      for (let {row, col} of coordinates) {
        board[row][col] = this.state.nextShape;
      }
    }

    return board;
  }

  isTetrominoSpaceFree(positionList, board=this.state.board) {
    return positionList.every( ({row, col}) => 
      row >= 0 && row <= BOARD_HEIGHT -1 && col >= 0 && col <= BOARD_WIDTH - 1 && board[row][col] === null );
  }

  rotateCurrentTetromino() {
    const proposedPosition = this.getCurrentCoordinates(1);

    if (this.isTetrominoSpaceFree(proposedPosition)) {
      this.setState({
        currentRotationIndex: this.state.currentRotationIndex + 1
      })
    }
  }

  clearFullRows(board) {
    const isRowNotFull = (row) => !row.every( (x) => typeof x === 'string');
    board = board.filter(isRowNotFull);
    const scoreIndex = BOARD_HEIGHT - board.length;
    while (board.length < BOARD_HEIGHT) {
      board.unshift(new Array(BOARD_WIDTH).fill(null));
    }
    return [board, SCORE_INCREMENTS[scoreIndex]];
  }

  isGameOver(board) {
    const coordinates = this.getCurrentCoordinates(0, this.state.nextShape, 0, 0, 4);
    return !this.isTetrominoSpaceFree(coordinates, board)
  }

  finalizeTetrominoPosition(currentPosition) {
    let newBoard = JSON.parse(JSON.stringify(this.state.board));
    let scoreIncrement = 0;

    for (let {row, col} of currentPosition) {
      newBoard[row][col] = this.state.currentShape
    }

    [newBoard, scoreIncrement] = this.clearFullRows(newBoard);

    const gameover = this.isGameOver(newBoard);

    if (gameover) {
      clearInterval(this.state.intervalId);
    }
 
    this.setState({
      gameOver: gameover,
      board: newBoard,
      rowIndex: 0,
      colIndex: 4,
      currentRotationIndex: 0,
      currentShape: this.state.nextShape,
      nextShape: this.getRandomTetrominoShape(),
      score: this.state.score + scoreIncrement,
      intervalId: gameover? null : this.state.intervalId
    })
  }

  moveCurrentTetrominoDown() {
    const currentCoordinates = this.getCurrentCoordinates();
    const proposedPosition = currentCoordinates.map(({row, col}) => ({row: row + 1, col}));

    if (this.isTetrominoSpaceFree(proposedPosition)) {
      this.setState({
        rowIndex: this.state.rowIndex + 1
      })
    } else {
      this.finalizeTetrominoPosition(currentCoordinates)
    }
  }

  moveCurrentTetrominoLeft() {
    const proposedPosition = this.getCurrentCoordinates().map( ({row, col}) => ({row, col: col - 1}));

    if (this.isTetrominoSpaceFree(proposedPosition)) {
      this.setState({
        colIndex: this.state.colIndex - 1
      })
    }
  }

  moveCurrentTetrominoRight() {
    const proposedPosition = this.getCurrentCoordinates().map( ({row,col}) => ({row, col: col + 1}));

    if (this.isTetrominoSpaceFree(proposedPosition)) {
      this.setState({
        colIndex: this.state.colIndex + 1
      })
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className='header'>{this.state.gameOver? 'GAME OVER' :  'Tetris'}</h1>
        <GameBoard board={this.getBoardContent()}/>
        <Options onStart={this.startGame} onPause={this.togglePause}/>
        <GameStats board={this.getNextItemContent()}/>
        <Score score={this.state.score}/>
      </div>
    );
  }
}

export default App;
