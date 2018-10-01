import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getAudios, manageAudio, listenAudio, getUser } from '../api/api';

function* fetchAudio({ value, page, userId, token }) {
  try {
    const payload = yield call(getAudios, value, page, userId, token);
    yield put({ type: 'GET_AUDIOS_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'GET_AUDIOS_FAILED' });
    throw error;
  }
}

function* watchAudioRequest() {
  yield takeEvery('GET_AUDIOS', fetchAudio);
}


function* fetchManageAudio({ id, ownerId, isDeleted, userId, token }) {
  try {
    const payload = yield call(manageAudio, id, ownerId, isDeleted, userId, token);
    if (isDeleted) {
      payload.isDeleted = false;
    } else if (ownerId === userId) {
      payload.isDeleted = true;
    } else {
      payload.isAdded = true;
    }
    yield put({ type: 'MANAGE_AUDIO_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'MANAGE_AUDIO_FAILED' });
    throw error;
  }
}

function* watchAudioManageRequest() {
  yield takeEvery('MANAGE_AUDIO', fetchManageAudio);
}


function* fetchListen({ audio, getStreamUrl }) {
  try {
    if (getStreamUrl) {
      const payload = yield call(listenAudio, audio.url);
      yield put({ type: 'PICK_AUDIO_COMPLETE', audio: { ...audio, url: payload.url }});
    } else {
      yield put({ type: 'PICK_AUDIO_COMPLETE', audio: { ...audio, isG: true }});
    }
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
    if (payload.response.error) {
      localStorage.removeItem('audioToken');
      location.reload();
    } else {
      yield put({ type: 'GET_USER_COMPLETE', user: payload.response });

      yield put({ type: 'GET_AUDIOS', value: '', page: 1, userId: payload.response.id, token });
    }
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
  yield fork(watchAudioManageRequest);
  yield fork(watchListenRequest);

  yield fork(watchUserRequest);
}
