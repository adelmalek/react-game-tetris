import React from 'react';
import './App.css';

import GameBoard from './Components/GameBoard/GameBoard';
import GameStats from './Components/GameStats/GameStats';
import Options from './Components/Options/Options';
import Score from './Components/Score/Score';

const BOARD_HEIGHT = 20;
const BOARD_WIDTH = 10;

class App extends React.Component {
  createEmptyBoard() {
    return new Array(BOARD_HEIGHT).fill(null).map( (_) => new Array(BOARD_WIDTH).fill(null));
  }

  state = {
    gameStarted: false,
    gameOver: false,
    paused: false,
    score: 0,
    board: this.createEmptyBoard()
  }

  startGame = () => {
    this.setState({
      gameStarted: true,
      gameOver: false,
      paused: false,
      score: 0
    })
  }

  togglePause = () => {
    this.setState({
      paused: !this.state.paused
    })
  }

  render() {
    return (
      <div className="App">
        <h1 className='header'>Tetris</h1>
        <GameBoard board={this.state.board}/>
        <Options onStart={this.startGame} onPause={this.togglePause}/>
        <GameStats />
        <Score score={this.state.score}/>
      </div>
    );
  }
}

export default App;
