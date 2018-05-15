import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { playerSelector } from '../../../selector/mainSelector';
import { pickAudio } from '../../../actions/actions';

import Controls from './Controls/Controls';
import QueueManage from './QueueManage/QueueManage';
import Volume from './Volume/Volume';

import styles from './Player.module.styl';

const mapStateToProps = state => ({
  player: playerSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ pickAudio }, dispatch);

class Player extends Component {
  state = {
    play: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.play && this.state.play) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  togglePlayState = () => {
    this.setState({ play: !this.state.play });
  };

  render() {
    const { play } = this.state;
    const { activeAudio } = this.props.player;
    if (!activeAudio) return null;
    return (
      <div className={styles.container}>
        <Controls
          play={play}
          onTogglePlayState={this.togglePlayState}
        />
        <div className={styles.info}>
          <div>{activeAudio.artist}</div>
          <div>{activeAudio.title}</div>
        </div>
        <QueueManage />
        <Volume />
        <audio
          ref={node => (this.audio = node)}
          src={activeAudio.url}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
