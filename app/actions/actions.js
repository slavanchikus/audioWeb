export const getUserAudio = userId => ({
  type: 'GET_USER_AUDIO',
  userId,
});

export const pickAudio = (queue, id) => ({
  type: 'PICK_AUDIO',
  payload: { queue, id }
});

export const moveAudio = () => ({
  type: 'MOVE_AUDIO',
});

export const togglePlaying = () => ({
  type: 'TOGGLE_PLAYING',
});

