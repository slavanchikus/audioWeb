import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { volumeIcon } from '../../../uikit/svgIcons';

import styles from './Volume.module.styl';

export default class Volume extends Component {
  static propTypes = {
    volume: PropTypes.number,
    pickVolume: PropTypes.func.isRequired
  };

  static defaultProps = {
    volume: 1
  };

  state = {
    showStick: false
  };

  clickIcon = () => {
    this.setState({ showStick: !this.state.showStick });
  };

  clickVolume = (e) => {
    let val = Math.abs((e.clientY - this.vol.getBoundingClientRect().bottom) / this.vol.getBoundingClientRect().height);
    if (val > 1) val = 1;
    this.props.pickVolume(val);
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
          onClick={this.clickIcon}
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
          <div ref={node => (this.vol = node)} onClick={this.clickVolume}>
            <div className={styles.button} style={{ height: `${volume * 100}%` }} />
          </div>
        </div>}
      </div>
    );
  }
}
