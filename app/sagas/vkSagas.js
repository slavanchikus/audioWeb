import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getAudio, listenAudio } from '../api/vkApi';

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

function* fetchListen({ audio }) {
  try {
    const payload = yield call(listenAudio, audio.url);
    yield put({ type: 'PICK_AUDIO_COMPLETE', payload: { ...audio, url: payload.url }});
  } catch (error) {
    yield put({ type: 'PICK_AUDIO_FAILED' });
    throw error;
  }
}

function* watchListenRequest() {
  yield takeEvery('PICK_AUDIO', fetchListen);
}

export function* vkSagas() {
  yield fork(watchAudioRequest);
  yield fork(watchListenRequest);
}
