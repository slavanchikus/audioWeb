const initialState = {
  isFetching: false
};

export default function uiStateReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_REQUEST': {
      return {
        isFetching: true
      };
    }
    case 'USER_REQUEST_COMPLETE': {
      return {
        isFetching: false
      };
    }
    default:
      break;
  }
  return state;
}
