import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getUser, getAudio } from '../api/vkApi';

export function* fetchUser() {
  try {
    const payload = yield call(getUser);
    yield put({ type: 'GET_USER_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'GET_USER_FAILED' });
    throw error;
  }
}

export function* watchUserRequest() {
  yield takeEvery('GET_USER', fetchUser);
}

export function* fetchAudio({ kind, value, count, offset }) {
  try {
    const payload = yield call(getAudio, kind, value, count, offset);
    yield put({ type: 'GET_AUDIO_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'GET_AUDIO_FAILED' });
    throw error;
  }
}

export function* watchAudioRequest() {
  yield takeEvery('GET_AUDIO', fetchAudio);
}

export function* vkSagas() {
  yield fork(watchAudioRequest);
  yield fork(watchUserRequest);
}
