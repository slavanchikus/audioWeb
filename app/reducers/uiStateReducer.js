const initialState = {
  isFetching: true
};

export default function uiStateReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_AUDIO': {
      return {
        isFetching: true
      };
    }
    case 'GET_AUDIO_COMPLETE': {
      return {
        isFetching: false
      };
    }
    default:
      break;
  }
  return state;
}
