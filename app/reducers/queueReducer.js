const initialState = [];

export default function queueReducer(state = initialState, action) {
  switch (action.type) {
    case 'PICK_AUDIO': {
      const { queue } = action;
      if (queue) return queue;
      return state;
    }
    case 'MANAGE_AUDIO_COMPLETE': {
      const { audioId, isDeleted = false, isAdded = false } = action.payload;

      const modefiedQueue = [...state];
      const index = modefiedQueue.findIndex(i => i.id === audioId);
      if (index !== -1) {
        modefiedQueue[index] = {
          ...modefiedQueue[index],
          isDeleted,
          isAdded
        };

        return modefiedQueue;
      }
      return state;
    }
    default:
      break;
  }
  return state;
}
