const initialState = {};

export default function audioReducer(state = initialState, action) {
  switch (action.type) {
    case 'PICK_AUDIO': {
      const { id } = action.payload;
      return {
        id,
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
