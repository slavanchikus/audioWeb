import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AudioContainer from './AudioContainer/AudioContainer';

import styles from './List.module.styl';

export default class List extends Component {
  static propTypes = {
    audio: PropTypes.object.isRequired,
    list: PropTypes.array.isRequired,
    getUserAudio: PropTypes.func.isRequired,
    pickAudio: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getUserAudio('9387646');
  }

  handlePickAudio = (id) => {
    this.props.pickAudio(this.props.list, id);
  };

  render() {
    const { audio, list } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div>№</div>
          <div>Артист</div>
          <div>Трек</div>
          <div>Время</div>
        </div>
        <div className={styles.content}>
          {list.map((item, i) =>
            <AudioContainer
              key={item.id}
              index={i}
              item={item}
              active={audio}
              onPickAudio={this.handlePickAudio}
            />)}
        </div>
      </div>
    );
  }
}
