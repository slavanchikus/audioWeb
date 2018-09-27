import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { randomIcon, repeatIcon } from '../../../uikit/svgIcons';

import AudioManage from '../../_Shared/AudioManage/AudioManage';

import styles from './QueueManage.module.styl';

export default class QueueManage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    audio: PropTypes.object.isRequired,
    loop: PropTypes.bool.isRequired,
    random: PropTypes.bool.isRequired,
    onLoopAudio: PropTypes.func.isRequired,
    onRandomAudio: PropTypes.func.isRequired
  };

  clickRepeat = () => {
    this.props.onLoopAudio();
  };

  clickRandom = () => {
    this.props.onRandomAudio();
  };

  render() {
    const { user, audio, loop, random } = this.props;
    const repeatClassName = cx(styles.item, {
      [styles.loop]: loop,
    });
    const randomClassName = cx(styles.item, {
      [styles.loop]: random,
    });

    return (
      <div className={styles.container}>
        <div className={styles.queue}>
          <div onClick={this.clickRandom} className={randomClassName}>{randomIcon()}</div>
          <div onClick={this.clickRepeat} className={repeatClassName}>{repeatIcon()}</div>
        </div>
        <div className={styles.tools}>
          <AudioManage
            audio={audio}
            user={user}
          />
        </div>
      </div>
    );
  }
}
