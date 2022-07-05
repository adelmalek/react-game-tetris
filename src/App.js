import React from 'react';
import './App.css';

import GameBoard from './Components/GameBoard/GameBoard';
import GameStats from './Components/GameStats/GameStats';
import Options from './Components/Options/Options';
import Score from './Components/Score/Score';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 className='header'>Tetris</h1>
        <GameBoard />
        <Options />
        <GameStats />
        <Score />
      </div>
    );
  }
}

export default App;
