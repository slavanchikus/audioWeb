import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AudioContainer from './AudioContainer/AudioContainer';

import styles from './AllAudio.module.styl';

export default class AllAudio extends Component {
  static propTypes = {
    audio: PropTypes.array.isRequired,
  };

  render() {
    const { audio } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div>№</div>
          <div>Артист</div>
          <div>Трек</div>
          <div>Продолжительность</div>
        </div>
        {audio.map((item, i) =>
          <AudioContainer
            key={item.id}
            index={i + 1}
            info={item}
          />)}
      </div>
    );
  }
}
