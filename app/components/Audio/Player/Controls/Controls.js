import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { prevIcon, playIcon, pauseIcon, nextIcon } from '../../../../uikit/svgIcons';

import styles from './Controls.module.styl';

export default class Controls extends Component {
  static propTypes = {
    play: PropTypes.bool.isRequired,
    onTogglePlayState: PropTypes.func.isRequired
  };

  render() {
    const { play, onTogglePlayState } = this.props;
    return (
      <div className={styles.container}>
        <div>{prevIcon()}</div>
        <div onClick={onTogglePlayState}>
          {!play ? playIcon() : pauseIcon()}
        </div>
        <div>{nextIcon()}</div>
      </div>
    );
  }
}
