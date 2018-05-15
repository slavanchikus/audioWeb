import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { audiosSelector, uiStateSelector } from '../../../selector/mainSelector';
import { getUserAudio, pickAudio } from '../../../actions/actions';

import AudioContainer from './AudioContainer/AudioContainer';

import styles from './List.module.styl';

const mapStateToProps = state => ({
  audios: audiosSelector(state),
  uiState: uiStateSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserAudio, pickAudio }, dispatch);

class List extends Component {
  componentDidMount() {
    this.props.getUserAudio('9387646');
  }

  handlePickAudio = (index) => {
    this.props.pickAudio(this.props.audios, index);
  };

  render() {
    const { audios } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div>№</div>
          <div>Артист</div>
          <div>Трек</div>
          <div>Время</div>
        </div>
        <div className={styles.content}>
          {audios.map((item, i) =>
            <AudioContainer
              key={item.id}
              index={i + 1}
              audio={item}
              onPickAudio={this.handlePickAudio}
            />)}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
