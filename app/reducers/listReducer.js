const initialState = {
  items: [],
  page: 1,
  value: null
};

export default function audiosReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PAGE': {
      return {
        ...state,
        page: state.page + 1,
      };
    }
    case 'GET_AUDIO': {
      const { value } = action;
      if (state.value !== value) {
        return {
          ...state,
          value,
          items: [],
          page: 1
        };
      }
      return {
        ...state,
        value,
      };
    }
    case 'GET_AUDIO_COMPLETE': {
      const { items } = action.payload;
      return {
        ...state,
        items: [
          ...state.items,
          ...items
        ]
      };
    }
    default:
      break;
  }
  return state;
}
