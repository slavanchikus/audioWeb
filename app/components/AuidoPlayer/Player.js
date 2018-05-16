import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Controls from './Controls/Controls';
import QueueManage from './QueueManage/QueueManage';
import Volume from './Volume/Volume';

import styles from './Player.module.styl';

export default class Player extends Component {
  static propTypes = {
    audio: PropTypes.object.isRequired,
    queue: PropTypes.array.isRequired,
    togglePlaying: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.audio.play();
  }

  componentDidUpdate(prevProps) {
    if ((!prevProps.audio.isPlaying && this.props.audio.isPlaying)
      || (!prevProps.audio.id !== this.props.audio.id)) {
      this.audio.play();
    }
    if (prevProps.audio.isPlaying && !this.props.audio.isPlaying) {
      this.audio.pause();
    }
  }

  render() {
    const { queue, audio } = this.props;
    const track = queue.find(item => item.id === audio.id);
    return (
      <div className={styles.container}>
        <Controls
          isPlaying={audio.isPlaying}
          onTogglePlay={this.props.togglePlaying}
        />
        <div className={styles.info}>
          <div>{track.artist}</div>
          <div>{track.title}</div>
        </div>
        <QueueManage />
        <Volume />
        <audio
          ref={node => (this.audio = node)}
          src={track.url}
        />
      </div>
    );
  }
}
