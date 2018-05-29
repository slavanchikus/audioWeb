import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { audioSelector, queueSelector, listSelector, uiStateSelector } from '../../selector/mainSelector';
import { getAudio, pickAudio, togglePlaying } from '../../actions/actions';

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
  bindActionCreators({ getAudio, pickAudio, togglePlaying }, dispatch);

class MainContainer extends Component {
  componentDidMount() {
    this.props.getAudio('rhcp', 0);
  }

  render() {
    const { audio, queue, list, uiState } = this.props;
    return (
      <div className={styles.container}>
        <Search
          getAudio={this.props.getAudio}
        />
        <AudioList
          audio={audio}
          list={list}
          isFetching={uiState.isFetching}
          getAudio={this.props.getAudio}
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
