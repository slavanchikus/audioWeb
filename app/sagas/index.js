import { fork } from 'redux-saga/effects';

import { audioSagas } from './mainSagas';

export default function* sagas() {
  yield fork(audioSagas);
}
