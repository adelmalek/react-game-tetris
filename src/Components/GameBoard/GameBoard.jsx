import React, { Component } from 'react';
import './GameBoard.css';
import Square from '../Square/Square';

export default class GameBoard extends Component {
  renderBoard() {
    const board = this.props.board;
    const JSXboard = [];

    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      const JSXrow = [];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        JSXrow.push(
          <Square shapeColor={cell} hasBorder={true} key={cell +j} />
        )
      }
      JSXboard.push(
        <div className='row' key={row.toString() + i}>{JSXrow}</div>
      )
    };

    return JSXboard;
  }
  render() {
    return (
      <div className='game-board'>{this.renderBoard()}</div>
    )
  }
}
