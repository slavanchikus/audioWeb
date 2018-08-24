const initialState = {
  isFetchingList: false,
  isFetchingAudio: false
};

export default function uiStateReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_AUDIO': {
      return {
        ...state,
        isFetchingList: true
      };
    }
    case 'GET_AUDIO_FAILED':
    case 'GET_AUDIO_COMPLETE': {
      return {
        ...state,
        isFetchingList: false
      };
    }
    case 'PICK_AUDIO': {
      return {
        ...state,
        isFetchingAudio: true
      };
    }
    case 'PICK_AUDIO_FAILED':
    case 'PICK_AUDIO_COMPLETE': {
      return {
        ...state,
        isFetchingAudio: false
      };
    }
    case 'GET_USER': {
      return {
        ...state,
        isFetchingUser: true
      };
    }
    case 'GET_USER_FAILED':
    case 'GET_USER_COMPLETE': {
      return {
        ...state,
        isFetchingUser: false
      };
    }
    default:
      break;
  }
  return state;
}
