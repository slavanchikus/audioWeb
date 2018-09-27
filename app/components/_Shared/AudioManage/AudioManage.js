import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { manageAudio } from '../../../api/api';

import { downloadIcon, successIcon } from '../../../uikit/svgIcons';

import styles from './AudioManage.module.styl';

export default class AudioManage extends Component {
  static propTypes = {
    audio: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  state = {
    isAdded: false,
    isDeleted: false,
    isManageFetching: false
  };

  clickDownload = (e) => {
    e.stopPropagation();
  };

  manageAudio = (e) => {
    e.stopPropagation();

    this.setState({ isManageFetching: true });

    const { isDeleted, isManageFetching } = this.state;
    const { audio, user } = this.props;

    if (!isManageFetching) {
      manageAudio(audio.id, audio.owner_id, isDeleted, user.id, user.token)
        .then((resposne) => {
          const { ownerId, userId } = resposne;
          if (isDeleted) {
            this.setState({ isDeleted: false });
          } else if (ownerId === userId) {
            this.setState({ isDeleted: true });
          } else {
            this.setState({ isAdded: true });
          }
          this.setState({ isManageFetching: false });
        });
    }
  };

  render() {
    const { isAdded, isDeleted } = this.state;
    const { audio, user } = this.props;

    return (
      <div className={styles.container}>
        <span onClick={this.manageAudio}>
          {user.id !== audio.owner_id ?
            <span>
              {isAdded ? successIcon() : '+'}
            </span>
            :
            <span>
              {isDeleted ? '+' : '×'}
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
