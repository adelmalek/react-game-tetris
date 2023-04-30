import React, { Component } from 'react';
import './Options.css';

export default class Options extends Component {
  render() {
    return (
      <div className='options'>
        <div className='buttons-div'>
          <button className='start-button' onClick={this.props.onStart}>Start</button>
          <button className='pause-button' onClick={this.props.onPause}>Pause</button>
        </div>
      </div>
    )
  }
}
