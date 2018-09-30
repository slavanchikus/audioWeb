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
    case 'MANAGE_AUDIO_COMPLETE': {
      const { audioId, isDeleted = false, isAdded = false } = action.payload;

      if (audioId === state.id) {
        return {
          ...state,
          isDeleted,
          isAdded
        };
      }
      return state;
    }
    default:
      break;
  }
  return state;
}
