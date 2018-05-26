import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { randomIcon, repeatIcon } from '../../../uikit/svgIcons';

import styles from './QueueManage.module.styl';

export default class QueueManage extends Component {
  static propTypes = {
    loop: PropTypes.bool.isRequired,
    random: PropTypes.bool.isRequired,
    onLoopAudio: PropTypes.func.isRequired,
    onRandomAudio: PropTypes.func.isRequired
  };

  handleRepeatClick = () => {
    this.props.onLoopAudio();
  };

  handleRandomAudio = () => {
    this.props.onRandomAudio()
  };

  render() {
    const { loop, random } = this.props;
    const repeatClassName = cx(styles.item, {
      [styles.loop]: loop,
    });
    const randomClassName = cx(styles.item, {
      [styles.loop]: random,
    });
    return (
      <div className={styles.container}>
        <div onClick={this.handleRandomAudio} className={randomClassName}>{randomIcon()}</div>
        <div onClick={this.handleRepeatClick} className={repeatClassName}>{repeatIcon()}</div>
      </div>
    );
  }
}
