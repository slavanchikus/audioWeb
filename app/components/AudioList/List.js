import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import AudioContainer from './AudioContainer/AudioContainer';

import styles from './List.module.styl';

export default class List extends Component {
  static propTypes = {
    audio: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    getAudio: PropTypes.func.isRequired,
    pickAudio: PropTypes.func.isRequired
  };

  handleScroll = () => {
    const { list, getAudio, isFetching } = this.props;
    if (!isFetching && this.list.scrollHeight - this.list.scrollTop === this.list.clientHeight && list.count !== list.items.length) {
      getAudio(list.scrollType, list.value, 150, list.items.length);
    }
  };

  handlePickAudio = (id) => {
    this.props.pickAudio(id, this.props.list.items);
  };

  render() {
    const { audio, list, isFetching } = this.props;
    const containerClassName = cx(styles.container, {
      [styles.fetching]: isFetching
    });
    return (
      <div className={containerClassName} onScroll={this.handleScroll} ref={node => (this.list = node)}>
        <div className={styles.header}>
          <div>№</div>
          <div>Артист</div>
          <div>Трек</div>
          <div>Время</div>
        </div>
        <div className={styles.content}>
          {list.count > 0 &&
          list.items.map((item, i) =>
            <AudioContainer
              key={`${item.id}++${i}`}
              index={i}
              item={item}
              active={audio}
              onPickAudio={this.handlePickAudio}
            />)}
          {list.count < 1 &&
          <div className={styles.empty}>Не найдено ни одной аудиозаписи</div>}
        </div>
        <div className={styles.loader_wrapper}>
          <div className={styles.loader} />
        </div>
      </div>
    );
  }
}
