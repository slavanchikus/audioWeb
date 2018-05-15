import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './AudioContainer.module.styl';

export default class AudioContainer extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    audio: PropTypes.object.isRequired,
    onPickAudio: PropTypes.func.isRequired
  };

  handleClick = () => {
    const { index, onPickAudio } = this.props;
    onPickAudio(index - 1);
  };

  render() {
    const { index, audio } = this.props;
    const min = Math.floor(audio.duration / 60);
    const sec = `0${audio.duration - (min * 60)}`;
    return (
      <div className={styles.container} onClick={this.handleClick}>
        <div>
          <div className={styles.index}>{index}</div>
          <div className={styles.play} />
        </div>
        <div>{audio.artist}</div>
        <div>{audio.title}</div>
        <div>{`${min}:${sec.substr(-2)}`}</div>
      </div>
    );
  }
}
