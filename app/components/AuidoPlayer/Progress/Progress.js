import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Progress.module.styl';

export default class Progress extends Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    playedTime: PropTypes.number.isRequired,
    onMoveTime: PropTypes.func.isRequired
  };

  static defaultProps = {
    duration: 0,
    playedTime: 0
  };

  handleClick= (e) => {
    this.props.onMoveTime(
      ((e.clientX - this.timeline.getBoundingClientRect().left) / this.timeline.getBoundingClientRect().width) * this.props.duration
    );
  };

  render() {
    const { duration, playedTime } = this.props;
    return (
      <div
        ref={node => (this.timeline = node)}
        className={styles.container}
        onClick={this.handleClick}
      >
        <div
          ref={node => (this.progress = node)}
          className={styles.progress}
          style={{ width: `${100 * (playedTime / duration)}%` }}
        />
      </div>
    );
  }
}
