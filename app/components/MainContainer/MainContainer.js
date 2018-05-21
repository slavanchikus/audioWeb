import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { infoSelector, audioSelector, queueSelector, listSelector, uiStateSelector } from '../../selector/mainSelector';
import { getUser, getAudio, pickAudio, togglePlaying, changeSearchType } from '../../actions/actions';

import AudioList from '../AudioList/List';
import AudioPlayer from '../AuidoPlayer/Player';
import Search from '../Search/Search';

import styles from './MainContainer.module.styl';

const mapStateToProps = state => ({
  info: infoSelector(state),
  audio: audioSelector(state),
  queue: queueSelector(state),
  list: listSelector(state),
  uiState: uiStateSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUser, getAudio, pickAudio, togglePlaying, changeSearchType }, dispatch);

class MainContainer extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  componentWillReceiveProps({ info }) {
    if (info !== this.props.info) {
      if (info.user) {
        this.props.getAudio(this.props.list.scrollType, info.user.id, 150, 0);
      } else {
        this.props.getAudio(this.props.list.scrollType, '9387646', 150, 0);
      }
    }
  }

  render() {
    const { info, audio, queue, list, uiState } = this.props;
    return (
      <div className={styles.container}>
        <Search
          userId={info.user ? info.user.id : '9387646'}
          searchType={list.searchType}
          getAudio={this.props.getAudio}
          changeSearchType={this.props.changeSearchType}
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
