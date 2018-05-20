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
    togglePlaying: PropTypes.func.isRequired,
    pickAudio: PropTypes.func.isRequired
  };

  state = {
    playerQueue: this.props.queue,
    duration: 0,
    currentTime: 0,
    volume: 1,
    loop: false,
    random: false
  };

  componentDidMount() {
    this.audio.play();
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate, false);
    this.audio.addEventListener('loadeddata', this.handleAudioLoad, false);
    this.audio.addEventListener('ended', this.handleAudioEnded, false);
  }

  componentWillReceiveProps({ audio, queue }) {
    if ((audio.isPlaying && audio.isPlaying !== this.props.audio.isPlaying)
      || (audio.id !== this.props.audio.id)) {
      this.audio.play();
    }
    if (!audio.isPlaying && audio.isPlaying !== this.props.audio.isPlaying) {
      this.audio.pause();
    }
    if (queue !== this.props.queue) {
      this.setState({ playerQueue: queue });
    }
  }

  handleAudioLoad = () => {
    this.setState({ duration: this.audio.duration });
  };

  handleAudioEnded = () => {
    this.handleMoveAudio('next');
  };

  handleTimeUpdate = () => {
    this.setState({ currentTime: this.audio.currentTime });
  };

  handleRewindTime = (newTime) => {
    this.audio.currentTime = newTime;
  };

  handleVolume = (val) => {
    this.setState({ volume: val });
    this.audio.volume = val;
  };

  handleLoopAudio = () => {
    this.setState({ loop: !this.state.loop });
  };

  handleRandomAudio = () => {
    if (!this.state.random) {
      const newPlayerQueue = [...this.state.playerQueue];
      this.setState({ random: true, playerQueue: newPlayerQueue.sort(() => Math.random() - 0.5) });
    } else {
      this.setState({ random: false, playerQueue: this.props.queue });
    }
  };

  handleMoveAudio = (direction) => {
    const { playerQueue } = this.state;
    const { audio } = this.props;
    const currAudio = playerQueue.findIndex(i => i.id === audio.id);
    let turnAudio;
    if (direction === 'prev') {
      turnAudio = playerQueue[currAudio - 1];
    } else {
      turnAudio = playerQueue[currAudio + 1];
    }
    if (turnAudio) this.props.pickAudio(turnAudio.id);
  };

  render() {
    const { playerQueue, duration, currentTime, volume, loop, random } = this.state;
    const { audio } = this.props;
    const track = playerQueue.find(item => item.id === audio.id);
    return (
      <div className={styles.container}>
        <audio
          ref={node => (this.audio = node)}
          src={track.url}
          autoPlay={audio.isPlaying}
          loop={loop}
        />
        <Progress
          duration={duration}
          currentTime={currentTime}
          onRewindTime={this.handleRewindTime}
        />
        <Controls
          isPlaying={audio.isPlaying}
          onTogglePlay={this.props.togglePlaying}
          onMoveAudio={this.handleMoveAudio}
        />
        <div className={styles.info}>
          <div>{track.artist}</div>
          <div>{track.title}</div>
        </div>
        <QueueManage
          loop={loop}
          random={random}
          onLoopAudio={this.handleLoopAudio}
          onRandomAudio={this.handleRandomAudio}
        />
        <Volume
          volume={volume}
          onPickVolume={this.handleVolume}
        />
      </div>
    );
  }
}
