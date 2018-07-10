const initialState = {};

export default function audioReducer(state = initialState, action) {
  switch (action.type) {
    case 'PICK_AUDIO_COMPLETE': {
      const { payload } = action;
      if (payload.id === state.id) {
        return {
          ...state,
          isPlaying: !state.isPlaying
        };
      }
      return {
        ...payload,
        isPlaying: true
      };
    }
    case 'TOGGLE_PLAYING': {
      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    }
    default:
      break;
  }
  return state;
}
