import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Search.module.styl';

export default class Search extends Component {
  render() {
    return (
      <div className={styles.container}>
        Я поиск
      </div>
    );
  }
}
