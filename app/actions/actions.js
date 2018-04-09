export const tokenRequest = () => ({
  type: 'TOKEN_REQUEST',
});

export const userRequest = inputValue => ({
  type: 'USER_REQUEST',
  inputValue,
});

export const resetStore = () => ({
  type: 'RESET_STORE',
});
