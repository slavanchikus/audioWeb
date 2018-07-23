import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Progress from './Progress/Progress';
import Controls from './Controls/Controls';
import QueueManage from './QueueManage/QueueManage';
import Volume from './Volume/Volume';

import styles from './Player.module.styl';

export default class Player extends PureComponent {
  static propTypes = {
    audio: PropTypes.object.isRequired,
    queue: PropTypes.array.isRequired,
    isFetchingAudio: PropTypes.object.isRequired,
    togglePlaying: PropTypes.func.isRequired,
    pickAudio: PropTypes.func.isRequired
  };

  state = {
    playerQueue: this.props.queue,
    currentTime: 0,
    volume: 1,
    loop: false,
    random: false,
    loaded: false
  };

  componentDidMount() {
    this.audio.play();
    document.title = this.props.audio.title;

    this.audio.addEventListener('timeupdate', this.handleTimeUpdate, false);
    this.audio.addEventListener('loadstart', this.handleAudioLoading, false);
    this.audio.addEventListener('loadeddata', this.handleAudioLoaded, false);
    this.audio.addEventListener('ended', this.handleAudioEnded, false);
  }

  componentWillReceiveProps({ audio, queue, isFetchingAudio }) {
    if (!isFetchingAudio && audio.isPlaying && !this.props.audio.isPlaying) {
      this.audio.play();
    } else if (!audio.isPlaying && this.props.audio.isPlaying) {
      this.audio.pause();
    }

    if (this.props.audio && audio && this.state.loaded
      && this.props.audio.id !== audio.id) {
      this.audio.pause();
      this.setState({ loaded: false });
    }

    if (queue !== this.props.queue) {
      if (this.state.random) {
        const newPlayerQueue = [...queue];
        this.setState({ random: true, playerQueue: newPlayerQueue.sort(() => Math.random() - 0.5) });
      } else {
        this.setState({ playerQueue: queue });
      }
    }

    if (audio !== this.props.audio) {
      document.title = audio.title;
    }
  }

  handleAudioLoading = () => {
    this.setState({ loaded: false });
  };

  handleAudioLoaded = () => {
    this.setState({ loaded: true });
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
    if (turnAudio) this.props.pickAudio(turnAudio, null);
  };

  render() {
    const { currentTime, volume, loop, random, loaded } = this.state;
    const { audio } = this.props;
    return (
      <div className={styles.container}>
        <audio
          ref={node => (this.audio = node)}
          src={audio.audioUrl}
          autoPlay={audio.isPlaying}
          loop={loop}
        />
        <Progress
          loaded={loaded}
          duration={audio.duration}
          currentTime={currentTime}
          onRewindTime={this.handleRewindTime}
        />
        <Controls
          isPlaying={audio.isPlaying}
          onTogglePlay={this.props.togglePlaying}
          onMoveAudio={this.handleMoveAudio}
        />
        <img
          src={audio.img}
          width={60}
          height={60}
          alt="pic"
        />
        <div className={styles.info}>
          <div>{audio.artist}</div>
          <div>{audio.title}</div>
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
