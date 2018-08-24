const initialState = {
  token: localStorage.getItem('audioToken') || null,
  id: null
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
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
