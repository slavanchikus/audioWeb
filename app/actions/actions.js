export const getAudio = (value, page, userId, token) => ({
  type: 'GET_AUDIO',
  value,
  page,
  userId,
  token
});

export const pickAudio = (audio, queue, getStreamUrl) => ({
  type: 'PICK_AUDIO',
  audio,
  queue,
  getStreamUrl
});

export const getUser = token => ({
  type: 'GET_USER',
  token,
});

export const togglePlaying = () => ({
  type: 'TOGGLE_PLAYING',
});

export const setPage = () => ({
  type: 'SET_PAGE',
});
