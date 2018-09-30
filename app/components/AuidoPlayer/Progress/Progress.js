import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import transformTime from '../../../utils/transformTime';

import styles from './Progress.module.styl';

export default class Progress extends Component {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    rewindTime: PropTypes.func.isRequired
  };

  clickTimeline = (e) => {
    this.props.rewindTime(
      ((e.clientX - this.timeline.getBoundingClientRect().left) / this.timeline.getBoundingClientRect().width) * this.props.duration
    );
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
        onClick={this.clickTimeline}
      >
        <div className={styles.played}>
          {transformTime(currentTime)}
        </div>
        <div className={styles.duration}>
          {transformTime(duration)}
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
