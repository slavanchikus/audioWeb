import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Vibrant from 'node-vibrant';

import cx from 'classnames';

import transformTime from '../../../utils/transformTime';
import { playIcon } from '../../../uikit/svgIcons';

import AudioManage from '../../_Shared/AudioManage/AudioManage';

import styles from './AudioContainer.module.styl';

export default class AudioContainer extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    active: PropTypes.object.isRequired,
    manageAudio: PropTypes.func.isRequired,
    pickAudio: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return (nextProps.active.id === this.props.item.id)
      || (this.props.active.id !== nextProps.active.id && this.props.active.id === this.props.item.id)
      || (this.props.item.isDeleted !== nextProps.item.isDeleted)
      || (this.props.item.isAdded !== nextProps.item.isAdded);
  }

  clickContainer = () => {
    const { item } = this.props;

    if (item.is_licensed) {
      this.props.pickAudio(item);
    }
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
    const { item, user, active } = this.props;
    const duration = transformTime(item.duration);
    const className = cx(styles.container, {
      [styles.authorized]: user.id,
      [styles.playing]: active.id === item.id,
      [styles.disabled]: !item.is_licensed || item.isDeleted,
    });

    const audioImg = item.img || 'images/audio_icon.png';

    return (
      <div
        className={className}
        ref={node => (this.container = node)}
        onClick={this.clickContainer}
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
            <AudioManage
              audio={item}
              user={user}
              manageAudio={this.props.manageAudio}
            />}
          </div>
        </div>
      </div>
    );
  }
}
