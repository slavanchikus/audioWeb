import { combineReducers } from 'redux';

import audio from './audioReducer';
import queue from './queueReducer';
import list from './listReducer';
import user from './userReducer';
import uiState from './uiStateReducer';

const rootReducer = combineReducers({
  audio,
  queue,
  list,
  user,
  uiState
});

export default rootReducer;
