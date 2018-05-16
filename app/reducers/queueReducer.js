const initialState = [];

export default function queueReducer(state = initialState, action) {
  switch (action.type) {
    case 'PICK_AUDIO': {
      const { queue } = action.payload;
      return queue;
    }
    default:
      break;
  }
  return state;
}
