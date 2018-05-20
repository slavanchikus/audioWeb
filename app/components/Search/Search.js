import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { searchIcon } from '../../uikit/svgIcons';

import styles from './Search.module.styl';

export default class Search extends Component {
  static propTypes = {
    onSearchAudio: PropTypes.func.isRequired
  };

  state = {
    query: ''
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleClick = () => {
    this.props.onSearchAudio(this.state.query, 150, 0);
  };

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleClick();
    }
  };

  render() {
    const { query } = this.state;
    return (
      <div className={styles.container}>
        <input
          type="text"
          value={query}
          placeholder="Поиск..."
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
        <div className={styles.search} onClick={this.handleClick}>
          {searchIcon()}
        </div>
      </div>
    );
  }
}
