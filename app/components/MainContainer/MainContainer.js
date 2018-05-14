import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { audioSelector, uiStateSelector } from '../../selector/mainSelector';

import { getUserAudio } from '../../actions/actions';

import styles from './MainContainer.module.styl';

const mapStateToProps = state => ({
  audio: audioSelector(state),
  uiState: uiStateSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getUserAudio }, dispatch);

class MainContainer extends Component {
  componentDidMount() {
    this.props.getUserAudio('9387646');
  }


  render() {
    const { audio } = this.props;
    return (
      <div className={styles.container}>
        {audio.map(item =>
          <audio key={item.id} src={item.url} controls />)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

