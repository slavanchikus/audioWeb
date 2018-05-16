import { combineReducers } from 'redux';

import audio from './audioReducer';
import queue from './queueReducer';
import list from './listReducer';
import uiState from './uiStateReducer';

const rootReducer = combineReducers({
  audio,
  queue,
  list,
  uiState
});

export default rootReducer;
