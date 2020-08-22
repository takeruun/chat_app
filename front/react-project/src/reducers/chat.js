const initialState = {
  chatLogs: [],
  chatLogsLists: [],
  chatSocketLists: [],
  unreadCounts: [],
  currentRoomIndex: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHAT_DATA':
      var logs = state.chatLogsLists[action.data];
      return Object.assign({}, state, {
        chatLogs: logs,
      });

    case 'SET_CHAT_SOCKET':
      return Object.assign({}, state, {
        chatSocket: action.data,
      });

    case 'SET_CHAT_SOCKET_LISTS':
      var newChatSocketLists = state.chatSocketLists;
      newChatSocketLists.push(action.data);

      return Object.assign({}, state, {
        chatSocketLists: newChatSocketLists,
      });

    case 'SET_CHAT_DATA_LISTS':
      var newChatLogsLists = state.chatLogsLists;
      newChatLogsLists.push(action.data);
      return Object.assign({}, state, {
        chatLogsLists: newChatLogsLists,
      });

    case 'SET_UNREAD_COUNTS':
      return Object.assign({}, state, {
        unreadCount: action.data,
      });

    case 'CHANGE_CHAT_DATA':
      var data = state.chatLogsLists[action.index];
      data = data.concat(action.data);

      var newChatLogsLists = state.chatLogsLists;
      newChatLogsLists.splice(action.index, 1, data);
      console.log(newChatLogsLists);

      return Object.assign({}, state, {
        chatLogsLists: newChatLogsLists,
      });

    default:
      return state;
  }
};
