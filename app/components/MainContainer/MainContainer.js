import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { tokenRequest, userRequest, resetStore } from '../../actions/actions';
import { audioSelector, userSelector, uiStateSelector } from '../../selector/mainSelector';

import { getAccessToken } from '../../utils/getAccessToken';

import { getAudio } from '../../api/vkAudioApiHandler';

import styles from './MainContainer.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
  audio: audioSelector(state),
  uiState: uiStateSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ tokenRequest, userRequest, resetStore }, dispatch);

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppReady: false,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('access_token_vkGallery') || getAccessToken();
    if (!accessToken) this.props.tokenRequest();
    const inputValue = localStorage.getItem('user_id_vkGallery');
    this.props.userRequest(inputValue);
  }

  componentWillReceiveProps({ user }) {
    if (user.id) {
      getAudio(user.id);
    }
  }

  componentWillUnmount() {
    this.props.resetStore();
  }

  handleUserRequest = () => {
    if (this.props.user.lastInputValue !== this.state.inputValue) {
      this.props.userRequest(this.state.inputValue);
    }
  };


  render() {
    return (
      <div className={styles.container}>
        Привет!
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

