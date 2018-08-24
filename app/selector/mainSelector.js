import { createSelector } from 'reselect';

export const audioSelector = state => state.audio;

export const listSelector = state => state.list;

export const userSelector = state => state.user;

export const uiStateSelector = state => state.uiState;

const queueStateSelector = state => state.queue;

export const queueSelector = createSelector(
  queueStateSelector,
  queue => (
    queue.filter(i => i.is_licensed)
  )
);
