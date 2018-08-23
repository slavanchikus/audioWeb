import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { audioSelector, queueSelector, listSelector, userSelector, uiStateSelector } from '../../selector/mainSelector';
import { getAudio, pickAudio, togglePlaying, setPage, setToken, getUser } from '../../actions/actions';

import AudioList from '../AudioList/List';
import AudioPlayer from '../AuidoPlayer/Player';
import Search from '../Search/Search';

import styles from './MainContainer.module.styl';

const mapStateToProps = state => ({
  audio: audioSelector(state),
  queue: queueSelector(state),
  list: listSelector(state),
  user: userSelector(state),
  uiState: uiStateSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAudio, pickAudio, togglePlaying, setPage, setToken, getUser }, dispatch);

class MainContainer extends Component {
  componentDidMount() {
    const { user, list } = this.props;
    const { value, page } = list;
    this.props.getAudio(value, page);

    if (user.token) {
      this.props.getUser(user.token);
    }
  }

  componentWillReceiveProps({ list, uiState }) {
    if (!uiState.isFetching && list.page !== this.props.list.page) {
      this.props.getAudio(list.value, list.page);
    }
  }

  handleAudioContainerClick = (clickedAudio) => {
    const { audio, queue, list } = this.props;

    const currQueue = queue.find(i => i.id === clickedAudio.id) ? null : list.items;

    if (audio.id !== clickedAudio.id) {
      this.props.pickAudio(clickedAudio, currQueue);
    } else {
      this.props.togglePlaying();
    }
  };

  render() {
    const { audio, queue, list, user, uiState } = this.props;

    return (
      <div className={styles.container}>
        <Search
          user={user}
          listValue={list.value}
          getAudio={this.props.getAudio}
          setToken={this.props.setToken}
        />
        <AudioList
          audio={audio}
          list={list}
          uiState={uiState}
          setPage={this.props.setPage}
          pickAudio={this.handleAudioContainerClick}
        />
        {audio.id && queue.length > 0 &&
        <AudioPlayer
          audio={audio}
          queue={queue}
          isFetchingAudio={uiState.isFetchingAudio}
          togglePlaying={this.props.togglePlaying}
          pickAudio={this.props.pickAudio}
        />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
