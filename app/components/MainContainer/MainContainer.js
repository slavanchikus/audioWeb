import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { audioSelector, userSelector, uiStateSelector } from '../../selector/mainSelector';

import { getAudio } from '../../api/vkApi';

import styles from './MainContainer.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
  audio: audioSelector(state),
  uiState: uiStateSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ }, dispatch);

class MainContainer extends Component {
  componentDidMount() {
    getAudio();
  }


  render() {
    return (
      <div className={styles.container}>
        Привет!
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

