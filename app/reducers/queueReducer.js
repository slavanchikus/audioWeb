const initialState = [];

export default function queueReducer(state = initialState, action) {
  switch (action.type) {
    case 'PICK_AUDIO': {
      const { queue } = action.payload;
      if (queue) return queue;
      return state;
    }
    default:
      break;
  }
  return state;
}
