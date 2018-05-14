import { combineReducers } from 'redux';

import uiState from './uiStateReducer';
import audio from './audioReducer';

const rootReducer = combineReducers({
  audio,
  uiState
});

export default rootReducer;
