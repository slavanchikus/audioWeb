const initialState = {};

export default function audioReducer(state = initialState, action) {
  switch (action.type) {
    case 'PICK_AUDIO': {
      const { audio } = action;
      return {
        ...audio,
        isPlaying: true
      };
    }
    case 'PICK_AUDIO_COMPLETE': {
      const { audio } = action;
      return {
        ...state,
        ...audio,
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
