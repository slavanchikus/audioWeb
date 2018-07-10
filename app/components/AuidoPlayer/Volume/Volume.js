import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { volumeIcon } from '../../../uikit/svgIcons';

import styles from './Volume.module.styl';

export default class Volume extends Component {
  static propTypes = {
    volume: PropTypes.number,
    onPickVolume: PropTypes.func.isRequired
  };

  static defaultProps = {
    volume: 1
  };

  state = {
    showStick: false
  };

  handleIconClick = () => {
    this.setState({ showStick: !this.state.showStick });
  };

  handleClick= (e) => {
    let val = Math.abs((e.clientY - this.progress.getBoundingClientRect().bottom) / this.progress.getBoundingClientRect().height);
    if (val > 1) val = 1;
    this.props.onPickVolume(val);
  };

  handleMouseEnter = () => {
    if (!this.state.showStick) this.showTimer = setTimeout(() => this.setState({ showStick: true }), 100);
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
  };

  handleMouseLeave = () => {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
    }
    this.hideTimer = setTimeout(() => this.setState({ showStick: false }), 600);
  };

  render() {
    const { showStick } = this.state;
    const { volume } = this.props;
    return (
      <div className={styles.container}>
        <div
          onClick={this.handleIconClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {volumeIcon(volume)}
        </div>
        {showStick &&
        <div
          className={styles.stick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div ref={node => (this.progress = node)} onClick={this.handleClick}>
            <div className={styles.button} style={{ height: `${volume * 100}%` }} />
          </div>
        </div>}
      </div>
    );
  }
}
