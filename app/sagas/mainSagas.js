import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getAudio, listenAudio, getUser } from '../api/api';

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
    const payload = yield call(listenAudio, audio.listenUrl);
    yield put({ type: 'PICK_AUDIO_COMPLETE', audio: { ...audio, audioUrl: payload.audioUrl }});
  } catch (error) {
    yield put({ type: 'PICK_AUDIO_FAILED' });
    throw error;
  }
}

function* watchListenRequest() {
  yield takeEvery('PICK_AUDIO', fetchListen);
}


function* fetchUser({ token }) {
  try {
    const payload = yield call(getUser, token);
    yield put({ type: 'GET_USER_COMPLETE', user: payload.response });
  } catch (error) {
    yield put({ type: 'GET_USER_ERROR' });
    throw error;
  }
}

function* watchUserRequest() {
  yield takeEvery('GET_USER', fetchUser);
}


export function* audioSagas() {
  yield fork(watchAudioRequest);
  yield fork(watchListenRequest);

  yield fork(watchUserRequest);
}
