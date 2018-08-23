const initialState = {
  token: localStorage.getItem('audioToken') || null
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TOKEN': {
      const { token } = action;
      return {
        ...state,
        token
      };
    }
    case 'GET_USER_COMPLETE': {
      const { user } = action;
      return {
        ...state,
        ...user
      };
    }
    default:
      break;
  }
  return state;
}
