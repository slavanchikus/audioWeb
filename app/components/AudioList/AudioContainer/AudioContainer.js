import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { playIcon } from '../../../uikit/svgIcons';

import styles from './AudioContainer.module.styl';

export default class AudioContainer extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    active: PropTypes.object.isRequired,
    onPickAudio: PropTypes.func.isRequired
  };

  handleClick = () => {
    const { item, onPickAudio } = this.props;
    onPickAudio(item.id);
  };

  render() {
    const { index, item, active } = this.props;
    const min = Math.floor(item.duration / 60);
    const sec = `0${item.duration - (min * 60)}`;
    const className = cx(styles.container, {
      [styles.disable]: item.content_restricted,
      [styles.playing]: active.id === item.id,
    });
    return (
      <div className={className} onClick={this.handleClick}>
        {active.id === item.id ?
          <div>
            {active.isPlaying ?
              <div className={styles.animation}>
                <span />
                <span />
              </div>
              :
              playIcon(18, 18)
            }
          </div>
          :
          <div className={styles.index}>{index + 1}</div>}
        <div>{item.artist}</div>
        <div>{item.title}</div>
        <div>{`${min}:${sec.substr(-2)}`}</div>
      </div>
    );
  }
}
