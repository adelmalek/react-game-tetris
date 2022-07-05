import React, { Component } from 'react';
import './Options.css';

export default class Options extends Component {
  render() {
    return (
      <div className='options'>
        <button className='start-button' onClick={this.props.onStart}>Start Game</button>
        <button className='pause-button' onClick={this.props.onPause}>Pause</button>
      </div>
    )
  }
}
