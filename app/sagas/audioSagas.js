import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getAudio } from '../api/audioApi';

function* fetchAudio({ value, page }) {
  try {
    const payload = yield call(getAudio, value, page);
    yield put({ type: 'GET_AUDIO_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'GET_AUDIO_FAILED' });
    throw error;
  }
}

function* watchAudioRequest() {
  yield takeEvery('GET_AUDIO', fetchAudio);
}

export function* audioSagas() {
  yield fork(watchAudioRequest);
}
