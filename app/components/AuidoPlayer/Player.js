import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Progress from './Progress/Progress';
import Controls from './Controls/Controls';
import QueueManage from './QueueManage/QueueManage';
import Volume from './Volume/Volume';

import styles from './Player.module.styl';

export default class AudioPlayer extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    audio: PropTypes.object.isRequired,
    queue: PropTypes.array.isRequired,
    isFetchingAudio: PropTypes.bool.isRequired,
    togglePlaying: PropTypes.func.isRequired,
    manageAudio: PropTypes.func.isRequired,
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
    const { audio } = this.props;

    this.audio.play();
    document.title = audio.title;

    this.audio.addEventListener('timeupdate', this.handleTimeUpdate, false);
    this.audio.addEventListener('loadstart', this.handleAudioLoading, false);
    this.audio.addEventListener('loadeddata', this.handleAudioLoaded, false);
    this.audio.addEventListener('ended', this.handleAudioEnded, false);

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: audio.title,
        artist: audio.artist
      });

      navigator.mediaSession.setActionHandler('play', this.props.togglePlaying);
      navigator.mediaSession.setActionHandler('pause', this.props.togglePlaying);
      navigator.mediaSession.setActionHandler('previoustrack', () => this.moveAudio('prev'));
      navigator.mediaSession.setActionHandler('nexttrack', () => this.moveAudio('next'));
    }
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

    if (audio.id !== this.props.audio.id) {
      document.title = audio.title;

      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: audio.title,
          artist: audio.artist
        });
      }
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

  rewindTime = (newTime) => {
    this.audio.currentTime = newTime;
  };

  pickVolume = (val) => {
    this.setState({ volume: val });
    this.audio.volume = val;
  };

  loopAudio = () => {
    this.setState({ loop: !this.state.loop });
  };

  randomAudio = () => {
    if (!this.state.random) {
      const newPlayerQueue = [...this.state.playerQueue];
      this.setState({ random: true, playerQueue: newPlayerQueue.sort(() => Math.random() - 0.5) });
    } else {
      this.setState({ random: false, playerQueue: this.props.queue });
    }
  };

  moveAudio = (direction) => {
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
    const { user, audio } = this.props;

    const audioImg = audio.img || 'images/audio_icon.png';

    return (
      <div className={styles.container}>
        <audio
          ref={node => (this.audio = node)}
          src={audio.url}
          autoPlay={audio.isPlaying}
          loop={loop}
        />
        <Progress
          loaded={loaded}
          duration={audio.duration}
          currentTime={currentTime}
          rewindTime={this.rewindTime}
        />
        <Controls
          isPlaying={audio.isPlaying}
          togglePlay={this.props.togglePlaying}
          moveAudio={this.moveAudio}
        />
        <img
          src={audioImg}
          width={60}
          height={60}
          alt="pic"
        />
        <div className={styles.info}>
          <div>{audio.artist}</div>
          <div>{audio.title}</div>
        </div>
        <QueueManage
          user={user}
          audio={audio}
          loop={loop}
          random={random}
          loopAudio={this.loopAudio}
          randomAudio={this.randomAudio}
          manageAudio={this.props.manageAudio}
        />
        <Volume
          volume={volume}
          pickVolume={this.pickVolume}
        />
      </div>
    );
  }
}
