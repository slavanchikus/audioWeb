export const getAudio = (value, page) => ({
  type: 'GET_AUDIO',
  value,
  page,
});

export const pickAudio = (audio, queue) => ({
  type: 'PICK_AUDIO',
  audio,
  queue
});

export const togglePlaying = () => ({
  type: 'TOGGLE_PLAYING',
});

export const setPage = () => ({
  type: 'SET_PAGE',
});
