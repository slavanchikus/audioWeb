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

  shouldComponentUpdate(nextProps) {
    return (nextProps.active.id === this.props.item.id)
      || (this.props.active.id !== nextProps.active.id && this.props.active.id === this.props.item.id);
  }

  handleClick = () => {
    const { item, onPickAudio } = this.props;
    onPickAudio(item);
  };

  handleDuration = (duration) => {
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
    const { index, item, active } = this.props;
    const duration = this.handleDuration(item.duration);
    const className = cx(styles.container, {
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
        <div>{duration}</div>
      </div>
    );
  }
}
