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

render(
  <App />,
  document.getElementById('root')
);

