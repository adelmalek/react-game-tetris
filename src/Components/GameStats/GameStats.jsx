import React, { Component } from 'react';
import './GameStats.css';
import GameBoard from '../GameBoard/GameBoard';

export default class GameStats extends Component {
  render() {
    return (
      <div className='game-stats'>
        Next: 
        <GameBoard board={this.props.board} hideBorders={true}/>
      </div>
    )
  }
}
