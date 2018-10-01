const initialState = {
  items: [],
  page: 1,
  value: ''
};

export default function audiosReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PAGE': {
      return {
        ...state,
        page: state.page + 1,
      };
    }
    case 'GET_AUDIOS': {
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
    case 'GET_AUDIOS_COMPLETE': {
      const { items, hasNextPage } = action.payload;

      return {
        ...state,
        items: [
          ...state.items,
          ...items
        ],
        hasNextPage
      };
    }
    case 'MANAGE_AUDIO_COMPLETE': {
      const { audioId, isDeleted = false, isAdded = false } = action.payload;

      const modefiedItems = [...state.items];
      const index = modefiedItems.findIndex(i => i.id === audioId);
      if (index !== -1) {
        modefiedItems[index] = {
          ...modefiedItems[index],
          isDeleted,
          isAdded
        };

        return {
          ...state,
          items: modefiedItems
        };
      }
      return state;
    }
    default:
      break;
  }
  return state;
}
