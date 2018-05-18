import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { volumeIcon } from '../../../uikit/svgIcons';

import styles from './Volume.module.styl';

export default class Volume extends Component {
  static propTypes = {
    volume: PropTypes.number.isRequired,
    onPickVolume: PropTypes.func.isRequired
  };

  state = {
    showStick: false
  };

  handleIconClick = () => {
    this.setState({ showStick: !this.state.showStick });
  };

  handleClick= (e) => {
    const val = Math.abs((e.clientY - this.progress.getBoundingClientRect().bottom) / this.progress.getBoundingClientRect().height);
    console.log(val);
    this.props.onPickVolume(val);
  };

  render() {
    const { showStick } = this.state;
    const { volume } = this.props;
    console.log(volume);
    return (
      <div className={styles.container}>
        <div onClick={this.handleIconClick}>{volumeIcon()}</div>
        <div className={styles.stick}>
          <div ref={node => (this.progress = node)} onClick={this.handleClick}>
            <div style={{ height: `${volume * 100}%` }} />
          </div>
        </div>
      </div>
    );
  }
}
