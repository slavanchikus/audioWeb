import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getUserAudio, searchAudio } from '../api/vkApi';

export function* fetchUserAudio({ userId }) {
  try {
    const payload = yield call(getUserAudio, userId);
    yield put({ type: 'GET_USER_AUDIO_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'GET_USER_AUDIO_FAILED' });
    throw error;
  }
}

export function* fetchAudio({ query, count, offset }) {
  try {
    const payload = yield call(searchAudio, query, count, offset);
    yield put({ type: 'SEARCH_AUDIO_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'SEARCH_AUDIO_FAILED' });
    throw error;
  }
}

export function* watchVkRequest() {
  yield takeEvery('GET_USER_AUDIO', fetchUserAudio);
  yield takeEvery('SEARCH_AUDIO', fetchAudio);
}

export function* vkSagas() {
  yield fork(watchVkRequest);
}
