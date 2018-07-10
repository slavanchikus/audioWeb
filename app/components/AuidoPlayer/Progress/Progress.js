import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './Progress.module.styl';

export default class Progress extends Component {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    onRewindTime: PropTypes.func.isRequired
  };

  handleClick= (e) => {
    this.props.onRewindTime(
      ((e.clientX - this.timeline.getBoundingClientRect().left) / this.timeline.getBoundingClientRect().width) * this.props.duration
    );
  };

  handleTransformTime = (duration) => {
    const secNum = parseInt(duration, 10);
    const hours = Math.floor(secNum / 3600) % 24;
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;
    return [hours, minutes, seconds]
      .map(v => v < 10 ? `0${v}` : v)
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  };

  render() {
    const { loaded, duration, currentTime } = this.props;
    const containerClassName = cx(styles.container, {
      [styles.loading]: !loaded
    });
    return (
      <div
        ref={node => (this.timeline = node)}
        className={containerClassName}
        onClick={this.handleClick}
      >
        <div className={styles.played}>
          {this.handleTransformTime(currentTime)}
        </div>
        <div className={styles.duration}>
          {this.handleTransformTime(duration)}
        </div>
        {loaded &&
        <div
          className={styles.progress}
          style={{ width: `${100 * (currentTime / duration)}%` }}
        />}
      </div>
    );
  }
}
