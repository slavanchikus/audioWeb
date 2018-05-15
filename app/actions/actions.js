export const getUserAudio = userId => ({
  type: 'GET_USER_AUDIO',
  userId,
});

export const pickAudio = (queue, index) => ({
  type: 'PICK_AUDIO',
  payload: { queue, index }
});

