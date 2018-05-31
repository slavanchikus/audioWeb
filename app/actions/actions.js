export const getAudio = (value, page) => ({
  type: 'GET_AUDIO',
  value,
  page,
});

export const pickAudio = (id, queue) => ({
  type: 'PICK_AUDIO',
  id,
  queue
});

export const togglePlaying = () => ({
  type: 'TOGGLE_PLAYING',
});

export const setPage = () => ({
  type: 'SET_PAGE',
});
