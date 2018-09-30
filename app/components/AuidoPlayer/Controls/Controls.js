import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { prevIcon, playIcon, pauseIcon, nextIcon } from '../../../uikit/svgIcons';

import styles from './Controls.module.styl';

export default class Controls extends Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    togglePlay: PropTypes.func.isRequired,
    moveAudio: PropTypes.func.isRequired
  };

  clickPrev = () => {
    this.props.moveAudio('prev');
  };

  clickNext = () => {
    this.props.moveAudio('next');
  };

  render() {
    const { isPlaying } = this.props;

    return (
      <div className={styles.container}>
        <div onClick={this.clickPrev}>{prevIcon()}</div>
        <div onClick={this.props.togglePlay}>
          {!isPlaying ? playIcon() : pauseIcon()}
        </div>
        <div onClick={this.clickNext}>{nextIcon()}</div>
      </div>
    );
  }
}
