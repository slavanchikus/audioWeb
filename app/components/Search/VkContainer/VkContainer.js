import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { vkAuth } from '../../../api/api';

import { vkLogo } from '../../../uikit/svgIcons';

import styles from './VkContainer.module.styl';

export default class VkContainer extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    setToken: PropTypes.func.isRequired
  };

  state = {
    login: '',
    password: '',
    showPopup: false,
    isError: false,
    isFetching: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.showPopup && this.state.showPopup) {
      document.addEventListener('click', this.handleClickOutside);
    } else if (prevState.showPopup && !this.state.showPopup) {
      document.removeEventListener('click', this.handleClickOutside);
    }
  }

  handleLoginChange = (e) => {
    this.setState({ login: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleClickOutside = (e) => {
    if (!this.container.contains(e.target)) {
      this.setState({ showPopup: false });
    }
  };

  handleAuth = () => {
    const { login, password } = this.state;
    if (login.trim().length > 0 && password.trim().length > 0) {
      this.setState({ isFetching: true });

      vkAuth(login, password)
        .then(response => response.text())
        .then((response) => {
          if (response.length === 108) {
            this.setState({ isError: true, isFetching: false });
          } else {
            const token = response.substring(108).replace(/"/g, '');
            localStorage.setItem('audioToken', token);

            this.props.setToken(token);
            this.setState({ showPopup: false });
          }
        });
    }
  };

  handleLogout = () => {
    localStorage.removeItem('audioToken');
    this.props.setToken(null);
  };

  render() {
    const { login, password, showPopup, isError, isFetching } = this.state;
    const { user } = this.props;

    return (
      <Fragment>
        {!user.token ?
          <div className={styles.logo} onClick={() => this.setState({ showPopup: true })}>
            {vkLogo()}
          </div>
          :
          <button className={styles.button} onClick={this.handleLogout}>
            Выйти
          </button>
        }
        {showPopup &&
        <div className={styles.overlay}>
          <div className={styles.container} ref={node => (this.container = node)}>
            <input
              type="text"
              value={login}
              placeholder="Логин"
              onChange={this.handleLoginChange}
            />
            <input
              type="password"
              value={password}
              placeholder="Пароль"
              onChange={this.handlePasswordChange}
            />
            <button className={styles.button} onClick={this.handleAuth} disabled={isFetching}>
              Войти
            </button>
            {isError &&
            <div className={styles.error}>Неправильный логин или пароль.<br />Или же ошибка сервиса :(</div>}
          </div>
        </div>}
      </Fragment>
    );
  }
}
