import React, { Component } from 'react';

import AudioList from '../Audio/List/List';
import AudioPlayer from '../Audio/Player/Player';
import Search from '../Search/Search';

import styles from './MainContainer.module.styl';

export default class MainContainer extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Search />
        <AudioList />
        <AudioPlayer />
      </div>
    );
  }
}

