export const getUser = () => ({
  type: 'GET_USER',
});

export const getAudio = (kind, value, count, offset) => ({
  type: 'GET_AUDIO',
  kind,
  value,
  count,
  offset,
});

export const pickAudio = (id, queue) => ({
  type: 'PICK_AUDIO',
  id,
  queue
});

export const changeSearchType = value => ({
  type: 'CHANGE_SEARCH_TYPE',
  value
});

export const togglePlaying = () => ({
  type: 'TOGGLE_PLAYING',
});

