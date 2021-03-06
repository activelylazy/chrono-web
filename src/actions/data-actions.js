import * as types from './action-types';

export const backlogReceived = messages => ({
  type: types.BACKLOG_RECEIVED,
  messages,
  isOffline: false,
});

export const offlineBacklogReceived = messages => ({
  type: types.BACKLOG_RECEIVED,
  messages,
  isOffline: true,
});

export const eventsReceived = messages => ({
  type: types.EVENTS_RECEIVED,
  messages,
});

export const sessionListReceived = sessions => ({
  type: types.SESSION_LIST_RECEIVED,
  sessions,
});

export const socketConnected = socket => ({
  type: types.SOCKET_CONNECTED,
  socket,
});
