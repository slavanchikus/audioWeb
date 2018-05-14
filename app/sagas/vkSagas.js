import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getAudio } from '../api/vkApi';

export function* fetchAudio({ userId }) {
  try {
    const payload = yield call(getAudio, userId);
    yield put({ type: 'GET_AUDIO_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'GET_AUDIO_FAILED' });
    throw error;
  }
}

export function* watchVkRequest() {
  yield takeEvery('GET_AUDIO', fetchAudio);
}

export function* vkSagas() {
  yield fork(watchVkRequest);
}
