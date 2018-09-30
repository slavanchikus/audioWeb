import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { audioSelector, queueSelector, listSelector, userSelector, uiStateSelector } from '../selector/mainSelector';
import { getAudio, pickAudio, manageAudio, togglePlaying, setPage, getUser } from '../actions/actions';

import AudioList from './AudioList/List';
import AudioPlayer from './AuidoPlayer/Player';
import Search from './Search/Search';

import styles from './MainContainer.module.styl';

const mapStateToProps = state => ({
  audio: audioSelector(state),
  queue: queueSelector(state),
  list: listSelector(state),
  user: userSelector(state),
  uiState: uiStateSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getAudio,
    pickAudio,
    manageAudio,
    togglePlaying,
    setPage,
    getUser
  }, dispatch);

class MainContainer extends Component {
  componentDidMount() {
    const { user, list } = this.props;
    const { value, page } = list;

    if (user.token) {
      this.props.getUser(user.token);
    } else {
      this.props.getAudio(value, page);
    }
  }

  componentWillReceiveProps({ list, uiState }) {
    if (!uiState.isFetchingList && list.page !== this.props.list.page) {
      this.props.getAudio(list.value, list.page, this.props.user.id, this.props.user.token);
    }
  }

  pickAudio = (clickedAudio) => {
    const { audio, queue, list, user } = this.props;

    const currQueue = queue.find(i => i.id === clickedAudio.id) ? null : list.items;
    const getStreamUrl = !user.id;

    if (audio.id !== clickedAudio.id) {
      this.props.pickAudio(clickedAudio, currQueue, getStreamUrl);
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
        />
        <AudioList
          user={user}
          audio={audio}
          list={list}
          uiState={uiState}
          setPage={this.props.setPage}
          manageAudio={this.props.manageAudio}
          pickAudio={this.pickAudio}
        />
        {audio.id && queue.length > 0 &&
        <AudioPlayer
          user={user}
          audio={audio}
          queue={queue}
          isFetchingAudio={uiState.isFetchingAudio}
          togglePlaying={this.props.togglePlaying}
          manageAudio={this.props.manageAudio}
          pickAudio={this.props.pickAudio}
        />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
