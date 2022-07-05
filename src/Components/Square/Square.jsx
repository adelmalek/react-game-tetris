import React, { Component } from 'react';
import './Square.css';

export default class Square extends Component {
  render() {
    let classList = 'tetromino-square';

    if (this.props.shapeColor) {
        classList += ` ${this.props.shapeColor}`;
    } else if (this.props.hasBorder) {
        classList += ' empty-width-border';
    } else {
        classList += ' empty'
    }

    return (
      <div className={classList}></div>
    )
  }
}
