import React, { Component } from 'react';
import './Options.css';

export default class Options extends Component {
  render() {
    return (
      <div className='options'>
        <button>Start Game</button>
        <button>Pause</button>
      </div>
    )
  }
}
