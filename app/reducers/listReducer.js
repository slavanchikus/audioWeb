const initialState = {
  items: [],
  searchType: 'audio',
  scrollType: 'user'
};

export default function audiosReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_AUDIO': {
      const { kind, value } = action;
      if (state.value && state.value !== value) {
        return {
          ...state,
          value,
          scrollType: kind,
          items: [],
        };
      }
      return {
        ...state,
        value
      };
    }
    case 'GET_AUDIO_COMPLETE': {
      const { response } = action.payload;
      return {
        ...state,
        count: response.count,
        items: [
          ...state.items,
          ...response.items
        ]
      };
    }
    case 'CHANGE_SEARCH_TYPE': {
      const { value } = action;
      return {
        ...state,
        searchType: value
      };
    }
    default:
      break;
  }
  return state;
}
