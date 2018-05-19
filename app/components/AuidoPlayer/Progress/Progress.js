import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Progress.module.styl';

export default class Progress extends Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    onMoveTime: PropTypes.func.isRequired
  };

  handleClick= (e) => {
    this.props.onMoveTime(
      ((e.clientX - this.timeline.getBoundingClientRect().left) / this.timeline.getBoundingClientRect().width) * this.props.duration
    );
  };

  handleTransformTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = `0${time - (min * 60)}`;
    return `${min}:${sec.substr(-2)}`;
  };

  render() {
    const { duration, currentTime } = this.props;
    return (
      <div
        ref={node => (this.timeline = node)}
        className={styles.container}
        onClick={this.handleClick}
      >
        <div className={styles.played}>
          {this.handleTransformTime(Math.round(currentTime))}
        </div>
        <div className={styles.duration}>
          {this.handleTransformTime(Math.round(duration))}
        </div>
        <div
          className={styles.progress}
          style={{ width: `${100 * (currentTime / duration)}%` }}
        />
      </div>
    );
  }
}
