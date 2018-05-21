const initialState = {};

export default function infoReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_USER_COMPLETE': {
      return action.payload;
    }
    default:
      break;
  }
  return state;
}
