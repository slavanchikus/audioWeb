import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { prevIcon, playIcon, pauseIcon, nextIcon } from '../../../uikit/svgIcons';

import styles from './Controls.module.styl';

export default class Controls extends Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    onTogglePlay: PropTypes.func.isRequired
  };

  render() {
    const { isPlaying, onTogglePlay } = this.props;
    return (
      <div className={styles.container}>
        <div>{prevIcon()}</div>
        <div onClick={onTogglePlay}>
          {!isPlaying ? playIcon() : pauseIcon()}
        </div>
        <div>{nextIcon()}</div>
      </div>
    );
  }
}
