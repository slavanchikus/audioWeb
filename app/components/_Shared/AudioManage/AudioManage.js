import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { downloadIcon, successIcon } from '../../../uikit/svgIcons';

import styles from './AudioManage.module.styl';

export default class AudioManage extends Component {
  static propTypes = {
    audio: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    manageAudio: PropTypes.func.isRequired
  };

  clickDownload = (e) => {
    e.stopPropagation();
  };

  manageAudio = (e) => {
    e.stopPropagation();

    const { audio, user } = this.props;
    this.props.manageAudio(audio.id, audio.owner_id, audio.isDeleted, user.id, user.token);
  };

  render() {
    const { audio, user } = this.props;

    return (
      <div className={styles.container}>
        <span onClick={this.manageAudio}>
          {user.id !== audio.owner_id ?
            <span>
              {audio.isAdded ? successIcon() : '+'}
            </span>
            :
            <span>
              {audio.isDeleted ? '+' : '×'}
            </span>}
        </span>
        {audio.is_licensed &&
        <a href={audio.url} target="_blank" onClick={this.clickDownload}>
          {downloadIcon()}
        </a>}
      </div>

    );
  }
}
