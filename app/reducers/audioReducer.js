const initialState = [];

export default function audioReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_USER_AUDIO_COMPLETE': {
      const { response } = action.payload;
      return response.items;
    }
    default:
      break;
  }
  return state;
}
