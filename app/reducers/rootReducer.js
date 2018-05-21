import { combineReducers } from 'redux';

import info from './infoReducer';
import audio from './audioReducer';
import queue from './queueReducer';
import list from './listReducer';
import uiState from './uiStateReducer';

const rootReducer = combineReducers({
  info,
  audio,
  queue,
  list,
  uiState
});

export default rootReducer;
