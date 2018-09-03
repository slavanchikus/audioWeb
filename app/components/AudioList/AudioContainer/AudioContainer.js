import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Vibrant from 'node-vibrant';

import cx from 'classnames';

import { manageAudio } from '../../../api/api';
import { playIcon, downloadIcon, successIcon } from '../../../uikit/svgIcons';

import styles from './AudioContainer.module.styl';

export default class AudioContainer extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    active: PropTypes.object.isRequired,
    onPickAudio: PropTypes.func.isRequired,
  };

  state = {
    isAdded: false,
    isDeleted: false,
    isManageFetching: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.active.id === this.props.item.id)
      || (this.props.active.id !== nextProps.active.id && this.props.active.id === this.props.item.id)
      || (this.state !== nextState);
  }

  handleContainerClick = () => {
    const { item, onPickAudio } = this.props;

    if (item.is_licensed) {
      onPickAudio(item);
    }
  };

  handleDownloadClick = (e) => {
    e.stopPropagation();
  };

  handleManageAudio = (e) => {
    e.stopPropagation();

    this.setState({ isManageFetching: true });

    const { isDeleted, isManageFetching } = this.state;
    const { item, user } = this.props;

    if (!isManageFetching) {
      manageAudio(item.id, item.owner_id, isDeleted, user.id, user.token)
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

  handleDuration = (duration) => {
    const secNum = parseInt(duration, 10);
    const hours = Math.floor(secNum / 3600) % 24;
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;
    return [hours, minutes, seconds]
      .map(v => (v < 10 ? `0${v}` : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  };

  handleImgLoaded = () => {
    const { canPaleteImg = false } = this.props.item;
    if (canPaleteImg) {
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
    const { isAdded, isDeleted } = this.state;
    const { item, user, active } = this.props;
    const duration = this.handleDuration(item.duration);
    const className = cx(styles.container, {
      [styles.authorized]: user.id,
      [styles.playing]: active.id === item.id,
      [styles.disabled]: !item.is_licensed || isDeleted,
    });

    const audioImg = item.img || 'images/audio_icon.png';

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
              src={audioImg}
              width={40}
              height={40}
              alt="pic"
              onLoad={this.handleImgLoaded}
            />
          </div>}
        <div>{item.artist}</div>
        <div>{item.title}</div>
        <div>
          <div className={styles.duration}>{duration}</div>
          <div className={styles.tools}>
            {user.id &&
            <Fragment>
              <span onClick={this.handleManageAudio}>
                {user.id !== item.owner_id ?
                  <span>
                    {isAdded ? successIcon() : '+'}
                  </span>
                  :
                  <span>
                    {isDeleted ? '+' : '×'}
                  </span>}
              </span>
              {item.is_licensed &&
              <a href={item.url} target="_blank" onClick={this.handleDownloadClick}>
                {downloadIcon()}
              </a>}
            </Fragment>}
          </div>
        </div>
      </div>
    );
  }
}
