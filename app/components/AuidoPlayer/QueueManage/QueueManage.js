import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { randomIcon, repeatIcon } from '../../../uikit/svgIcons';

import styles from './QueueManage.module.styl';

export default class QueueManage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div>{randomIcon()}</div>
        <div>{repeatIcon()}</div>
      </div>
    );
  }
}
