const initialState = {
  items: [],
};

export default function audiosReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_AUDIO': {
      const { value } = action;
      if (state.value && state.value !== value) {
        return {
          ...state,
          value,
          items: [],
        };
      }
      return {
        ...state,
        value,
      };
    }
    case 'GET_AUDIO_COMPLETE': {
      const { data } = action.payload;
      return {
        ...state,
        items: [
          ...state.items,
          ...data
        ]
      };
    }
    default:
      break;
  }
  return state;
}
