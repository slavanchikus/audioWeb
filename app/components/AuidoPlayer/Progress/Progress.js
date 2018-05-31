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

  handleTransformTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = `0${time - (min * 60)}`;
    return `${min}:${sec.substr(-2)}`;
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
