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
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value.length > 0 && this.state.value.length === 0) {
      const { userId, getAudio } = this.props;
      getAudio('user', userId, 150, 0);
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSearchClick = () => {
    const { getAudio } = this.props;
    getAudio('audio', this.state.value, 150, 0);
  };

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleSearchClick();
    }
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
          onKeyUp={this.handleKeyUp}
        />
        <div className={styles.search} onClick={this.handleSearchClick}>
          {searchIcon()}
        </div>
      </div>
    );
  }
}
