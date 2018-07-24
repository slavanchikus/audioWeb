import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Vibrant from 'node-vibrant';

import cx from 'classnames';

import { playIcon, downloadIcon } from '../../../uikit/svgIcons';

import styles from './AudioContainer.module.styl';

export default class AudioContainer extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    active: PropTypes.object.isRequired,
    onPickAudio: PropTypes.func.isRequired,
    onDownloadAudio: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return (nextProps.active.id === this.props.item.id)
      || (this.props.active.id !== nextProps.active.id && this.props.active.id === this.props.item.id);
  }

  handleContainerClick = () => {
    const { item, onPickAudio } = this.props;
    onPickAudio(item);
  };

  handleDownloadClick = (e) => {
    e.stopPropagation();
    const { item, onDownloadAudio } = this.props;
    onDownloadAudio(item);
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

  handleImgLoaded = () => {
    const { item } = this.props;
    if (!item.imgCors) {
      Vibrant.from(this.img.src).getPalette((err, palette) => {
        if (palette && palette.LightMuted) {
          const rgb = palette.LightMuted.getRgb();
          this.container.style.backgroundColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.2)`;
        }
      });
    } else {
      this.container.style.backgroundColor = `rgba(${Math.floor(Math.random() * 56) + 200},
      ${Math.floor(Math.random() * 56) + 200},
      ${Math.floor(Math.random() * 56) + 200},0.2)`;
    }
  };

  render() {
    const { item, active } = this.props;
    const duration = this.handleDuration(item.duration);
    const className = cx(styles.container, {
      [styles.playing]: active.id === item.id,
    });
    return (
      <div
        className={className}
        ref={node => (this.container = node)}
        onClick={this.handleContainerClick}
      >
        {active.id === item.id ?
          <div className={styles.active}>
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
          <div className={styles.img}>
            <img
              ref={node => (this.img = node)}
              src={item.img}
              width={40}
              height={40}
              alt="pic"
              onLoad={this.handleImgLoaded}
            />
          </div>}
        <div>{item.artist}</div>
        <div>{item.title}</div>
        <div>
          <span>{duration}</span>
          <div onClick={this.handleDownloadClick}>
            {downloadIcon()}
          </div>
        </div>
      </div>
    );
  }
}
