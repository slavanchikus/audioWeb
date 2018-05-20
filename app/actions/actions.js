export const getUserAudio = userId => ({
  type: 'GET_USER_AUDIO',
  userId,
});

export const searchAudio = (query, count, offset) => ({
  type: 'SEARCH_AUDIO',
  query,
  count,
  offset
});

export const pickAudio = (id, queue) => ({
  type: 'PICK_AUDIO',
  id,
  queue
});

export const togglePlaying = () => ({
  type: 'TOGGLE_PLAYING',
});

