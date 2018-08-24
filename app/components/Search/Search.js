import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import VkContainer from './VkContainer/VkContainer';

import { audioIcon } from '../../uikit/svgIcons';

import styles from './Search.module.styl';

export default class Search extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    listValue: PropTypes.string.isRequired,
    getAudio: PropTypes.func.isRequired,
  };

  state = {
    value: '',
    isTyping: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isTyping && !this.state.isTyping) {
      const { user, listValue, getAudio } = this.props;
      if (listValue.trim() !== this.state.value.trim()) {
        if (this.state.value.length === 0) {
          getAudio('', 1, user.id, user.token);
        } else {
          getAudio(this.state.value, 1, user.id, user.token);
        }
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
    this.typingDelay = setTimeout(() => this.setState({ isTyping: false }), 1000);
    this.setState({ value: e.target.value });
  };

  render() {
    const { value, } = this.state;
    const { user } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.search_type}>
          {audioIcon()}
        </div>
        <input
          type="text"
          value={value}
          placeholder="Введите название..."
          onChange={this.handleChange}
        />
        <VkContainer
          user={user}
        />
      </div>
    );
  }
}
