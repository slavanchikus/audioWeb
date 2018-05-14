import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './AudioContainer.module.styl';

export default class AudioContainer extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    info: PropTypes.object.isRequired,
  };

  render() {
    const { index, info } = this.props;
    const min = Math.floor(info.duration / 60);
    const sec = `0${info.duration - (min * 60)}`;
    return (
      <div className={styles.container}>
        <div>{index}</div>
        <div>{info.artist}</div>
        <div>{info.title}</div>
        <div>{`${min}:${sec.substr(-2)}`}</div>
      </div>
    );
  }
}
