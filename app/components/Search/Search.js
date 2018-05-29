import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { searchIcon, audioIcon } from '../../uikit/svgIcons';

import styles from './Search.module.styl';

export default class Search extends Component {
  static propTypes = {
    getAudio: PropTypes.func.isRequired,
  };

  state = {
    value: '',
    isTyping: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isTyping && !this.state.isTyping) {
      const { getAudio } = this.props;
      if (this.state.value.length === 0) {
        getAudio('rhcp', 0);
      } else {
        getAudio(this.state.value, 0);
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
    getAudio(this.state.value, 0);
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
