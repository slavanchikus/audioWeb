import React, { Component } from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './reducers/store';

import MainContainer from './components/MainContainer';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('assets/service-worker.js')
    .then(() => console.log('service worker installed'))
    .catch(err => console.error('Error', err));
}

render(
  <App />,
  document.getElementById('root')
);

