import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { volumeIcon } from '../../../../uikit/svgIcons';

import styles from './Volume.module.styl';

export default class Volume extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div>{volumeIcon()}</div>
      </div>
    );
  }
}
