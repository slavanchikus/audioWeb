import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './LoginPopup.module.styl';

export default class LoginPopup extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired
  };

  state = {
    login: '',
    password: '',
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleLoginChange = (e) => {
    this.setState({ login: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleButtonClick = () => {
    const { login, password } = this.state;
    if (login.trim().length > 0 && password.trim().length > 0) {
      console.log('submit');
    }
  };

  handleClickOutside = (e) => {
    if (!this.container.contains(e.target)) {
      this.props.onClose();
    }
  };

  render() {
    const { login, password } = this.state;
    return (
      <div className={styles.overlay}>
        <div className={styles.container} ref={node => (this.container = node)}>
          <input
            type="text"
            value={login}
            placeholder="Логин"
            onChange={this.handleLoginChange}
          />
          <input
            type="text"
            value={password}
            placeholder="Пароль"
            onChange={this.handlePasswordChange}
          />
          <div className={styles.button} onClick={this.handleButtonClick}>
            Войти
          </div>
        </div>
      </div>
    );
  }
}
