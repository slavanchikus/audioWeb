import { combineReducers } from 'redux';

import player from './playerReducer';
import audios from './audiosReducer';
import uiState from './uiStateReducer';

const rootReducer = combineReducers({
  player,
  audios,
  uiState
});

export default rootReducer;
