import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { prevIcon, playIcon, pauseIcon, nextIcon } from '../../../uikit/svgIcons';

import styles from './Controls.module.styl';

export default class Controls extends Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    onTogglePlay: PropTypes.func.isRequired,
    onMoveAudio: PropTypes.func.isRequired
  };

  clickPrev = () => {
    this.props.onMoveAudio('prev');
  };

  clickNext = () => {
    this.props.onMoveAudio('next');
  };

  render() {
    const { isPlaying, onTogglePlay } = this.props;

    return (
      <div className={styles.container}>
        <div onClick={this.clickPrev}>{prevIcon()}</div>
        <div onClick={onTogglePlay}>
          {!isPlaying ? playIcon() : pauseIcon()}
        </div>
        <div onClick={this.clickNext}>{nextIcon()}</div>
      </div>
    );
  }
}
