import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getAudio, listenAudio } from '../api/audioApi';

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


function* downloadAudio({ audio }) {
  try {
    const payload = yield call(listenAudio, audio.listenUrl);
    const mockA = document.createElement('a');
    mockA.setAttribute('href', payload.audioUrl);
    mockA.setAttribute('download', 'download');
    mockA.setAttribute('target', '_blank');
    document.body.appendChild(mockA);
    mockA.click();
    document.body.removeChild(mockA);
    yield put({ type: 'DOWNLOAD_AUDIO_COMPLETE' });
  } catch (error) {
    yield put({ type: 'DOWNLOAD_AUDIO_FAILED' });
    throw error;
  }
}

function* watchDownloadRequest() {
  yield takeEvery('DOWNLOAD_AUDIO', downloadAudio);
}


export function* audioSagas() {
  yield fork(watchAudioRequest);
  yield fork(watchListenRequest);
  yield fork(watchDownloadRequest);
}
