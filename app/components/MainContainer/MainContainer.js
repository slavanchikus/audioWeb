import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { audioSelector, queueSelector, listSelector, uiStateSelector } from '../../selector/mainSelector';
import { getUserAudio, searchAudio, pickAudio, togglePlaying } from '../../actions/actions';

import AudioList from '../AudioList/List';
import AudioPlayer from '../AuidoPlayer/Player';
import Search from '../Search/Search';

import styles from './MainContainer.module.styl';

const mapStateToProps = state => ({
  audio: audioSelector(state),
  queue: queueSelector(state),
  list: listSelector(state),
  uiState: uiStateSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserAudio, searchAudio, pickAudio, togglePlaying }, dispatch);

class MainContainer extends Component {
  render() {
    const { audio, queue, list, uiState } = this.props;
    return (
      <div className={styles.container}>
        <Search
          onSearchAudio={this.props.searchAudio}
        />
        <AudioList
          audio={audio}
          list={list}
          getUserAudio={this.props.getUserAudio}
          pickAudio={this.props.pickAudio}
        />
        {audio.id && queue.length > 0 &&
        <AudioPlayer
          audio={audio}
          queue={queue}
          togglePlaying={this.props.togglePlaying}
          pickAudio={this.props.pickAudio}
        />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
