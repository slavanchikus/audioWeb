import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { searchIcon, audioIcon } from '../../uikit/svgIcons';

import styles from './Search.module.styl';

export default class Search extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    getAudio: PropTypes.func.isRequired,
  };

  state = {
    value: '',
    isTyping: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isTyping && !this.state.isTyping) {
      const { userId, getAudio } = this.props;
      if (this.state.value.length === 0) {
        getAudio('user', userId, 150, 0);
      } else {
        getAudio('audio', this.state.value, 150, 0);
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
    this.typingDelay = setTimeout(() => this.setState({ isTyping: false }), 500);
    this.setState({ value: e.target.value });
  };

  handleSearchClick = () => {
    const { getAudio } = this.props;
    getAudio('audio', this.state.value, 150, 0);
  };

  render() {
    const { value } = this.state;
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
        <div className={styles.search} onClick={this.handleSearchClick}>
          {searchIcon()}
        </div>
      </div>
    );
  }
}
