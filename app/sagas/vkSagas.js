import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getUser } from '../api/vkApi';

/* client id = 6285810 */

export function* fetchAccessToken() {
  try {
    window.location.replace(`https://oauth.vk.com/authorize?client_id=6285810&display=popup&redirect_uri=${window.location.href}&scope=friends&response_type=token&v=5.69`);
  } catch (error) {
    yield put({ type: 'TOKEN_REQUEST_ERROR' });
    throw error;
  }
}

export function* fetchUser({ inputValue }) {
  try {
    const userPayload = yield call(getUser, inputValue);
    const payload = { ...userPayload, inputValue };
    yield put({ type: 'USER_REQUEST_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'USER_REQUEST_ERROR' });
    throw error;
  }
}

export function* watchVkRequest() {
  yield takeEvery('USER_REQUEST', fetchUser);
  yield takeEvery('TOKEN_REQUEST', fetchAccessToken);
}

export function* vkSagas() {
  yield fork(watchVkRequest);
}
