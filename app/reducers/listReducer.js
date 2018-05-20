const initialState = [];

export default function audiosReducer(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_AUDIO_COMPLETE':
    case 'GET_USER_AUDIO_COMPLETE': {
      const { response } = action.payload;
      return response.items;
    }
    default:
      break;
  }
  return state;
}
