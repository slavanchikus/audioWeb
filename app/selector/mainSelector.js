import { createSelector } from 'reselect';

export const audioSelector = state => state.audio;

const queueStateSelector = state => state.queue;

export const listSelector = state => state.list;

export const uiStateSelector = state => state.uiState;

export const queueSelector = createSelector(
  queueStateSelector,
  queue => (
      queue.filter(i => !i.content_restricted)
    )
);
