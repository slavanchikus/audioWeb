const initialState = [];

export default function audioReducer(state = initialState, action) {
  switch (action.type) {
    case 'TEST': {
      const { response } = action.payload;
      return response.items;
    }
    default:
      break;
  }
  return state;
}
