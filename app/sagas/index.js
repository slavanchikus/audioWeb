import { fork } from 'redux-saga/effects';

import { audioSagas } from './audioSagas';

export default function* sagas() {
  yield fork(audioSagas);
}
