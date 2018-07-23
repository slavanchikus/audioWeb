const initialState = {
  isFetchingList: false,
  isFetchingAudio: false
};

export default function uiStateReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_AUDIO': {
      return {
        isFetchingList: true
      };
    }
    case 'GET_AUDIO_FAILED':
    case 'GET_AUDIO_COMPLETE': {
      return {
        isFetchingList: false
      };
    }
    case 'PICK_AUDIO': {
      return {
        isFetchingAudio: true
      };
    }
    case 'PICK_AUDIO_FAILED':
    case 'PICK_AUDIO_COMPLETE': {
      return {
        isFetchingAudio: false
      };
    }
    default:
      break;
  }
  return state;
}
