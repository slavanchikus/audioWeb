import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import LoginPopup from './LoginPopup/LoginPopup';

import { vkLogo, audioIcon } from '../../uikit/svgIcons';

import styles from './Search.module.styl';

export default class Search extends PureComponent {
  static propTypes = {
    listValue: PropTypes.string.isRequired,
    getAudio: PropTypes.func.isRequired,
  };

  state = {
    value: '',
    loginPopup: false,
    isTyping: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isTyping && !this.state.isTyping) {
      const { listValue, getAudio } = this.props;
      if (listValue.trim() !== this.state.value.trim()) {
        if (this.state.value.length === 0) {
          getAudio('', 1);
        } else {
          getAudio(this.state.value, 1);
        }
      }
    }
  }

  handleChange = (e) => {
    if (!this.state.isTyping) {
      this.setState({ isTyping: true });
    }
    if (this.typingDelay !== undefined) {
      clearTimeout(this.typingDelay);
    }
    this.typingDelay = setTimeout(() => this.setState({ isTyping: false }), 1000);
    this.setState({ value: e.target.value });
  };


  toggleLoginPopupState = () => {
    this.setState({ loginPopup: !this.state.loginPopup });
  };

  render() {
    const { value, loginPopup } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.search_type}>
          {audioIcon()}
        </div>
        <input
          type="text"
          value={value}
          placeholder="Поиск по аудиозаписям"
          onChange={this.handleChange}
        />
        <div className={styles.logo} onClick={this.toggleLoginPopupState}>
          {vkLogo()}
        </div>
        {loginPopup &&
        <LoginPopup
          onClose={this.toggleLoginPopupState}
        />}
      </div>
    );
  }
}
