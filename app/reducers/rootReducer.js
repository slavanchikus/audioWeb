import { combineReducers } from 'redux';

import user from './userReducer';
import uiState from './uiStateReducer';
import audio from './audioReducer';

const rootReducer = combineReducers({
  user,
  audio,
  uiState
});

export default rootReducer;
