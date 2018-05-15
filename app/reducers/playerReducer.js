const initialState = {};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case 'PICK_AUDIO': {
      const { queue, index } = action.payload;
      return {
        ...action.payload,
        activeAudio: queue[index]
      };
    }
    default:
      break;
  }
  return state;
}
