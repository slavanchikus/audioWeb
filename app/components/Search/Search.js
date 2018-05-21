import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { searchIcon, userIcon, audioIcon } from '../../uikit/svgIcons';

import styles from './Search.module.styl';

export default class Search extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    searchType: PropTypes.string.isRequired,
    getAudio: PropTypes.func.isRequired,
    changeSearchType: PropTypes.func.isRequired
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
    const { searchType, getAudio } = this.props;
    getAudio(searchType, this.state.value, 150, 0);
  };

  handleTypeClick = () => {
    /* const { searchType } = this.props;
    if (searchType === 'user') {
      this.props.changeSearchType('audio');
    } else {
      this.props.changeSearchType('user');
    } */
  };

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleSearchClick();
    }
  };

  render() {
    const { value } = this.state;
    const { searchType } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.search_type} onClick={this.handleTypeClick}>
          {searchType === 'user' ?
            userIcon()
            :
            audioIcon()}
        </div>
        <input
          type="text"
          value={value}
          placeholder={searchType === 'user' ? 'Вставьте ссылку профиля' : 'Поиск по аудиозаписям'}
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
