const initialState = {};

export default function audioReducer(state = initialState, action) {
  switch (action.type) {
    case 'PICK_AUDIO': {
      const { audio } = action;
      if (audio.id === state.id) {
        return {
          ...state,
          isPlaying: !state.isPlaying
        };
      }
      return {
        ...audio,
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
