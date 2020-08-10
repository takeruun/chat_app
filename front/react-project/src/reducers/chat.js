const initialState = {
  chatLogs: [],
  chatSocketLists: [],
  unreadCount: [[]],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHAT_DATA':
      return Object.assign({}, state, {
        chatLogs: action.data,
      });

    case 'SET_CHAT_SOCKET':
      return Object.assign({}, state, {
        chatSocket: action.data,
      });

    case 'SET_CHAT_SOCKET_LISTS':
      return Object.assign({}, state, {
        chatSocketLists: action.data,
      });

    default:
      return state;
  }
};
