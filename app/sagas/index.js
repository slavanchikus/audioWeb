import { fork } from 'redux-saga/effects';

import { vkSagas } from './vkSagas';

export default function* sagas() {
  yield fork(vkSagas);
}
