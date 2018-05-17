import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Progress from './Progress/Progress';
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

  state = {
    playedTime: 0
  };

  componentDidMount() {
    this.audio.play();
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate, false);
  }

  componentWillReceiveProps({ audio }) {
    if ((audio.isPlaying && audio.isPlaying !== this.props.audio.isPlaying)
      || (audio.id !== this.props.audio.id)) {
      this.audio.play();
    }
    if (!audio.isPlaying && audio.isPlaying !== this.props.audio.isPlaying) {
      this.audio.pause();
    }
  }

  handleTimeUpdate = () => {
    this.setState({ playedTime: this.audio.currentTime });
  };

  handleMoveTime = (newTime) => {
    this.audio.currentTime = newTime;
  };

  render() {
    const { playedTime } = this.state;
    const { queue, audio } = this.props;
    const track = queue.find(item => item.id === audio.id);
    return (
      <div className={styles.container}>
        <Progress
          duration={this.audio && this.audio.duration}
          playedTime={playedTime}
          onMoveTime={this.handleMoveTime}
        />
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
          autoPlay={audio.isPlaying}
        />
      </div>
    );
  }
}
