const initialState = {
  chatLogs: [],
  chatLogsLists: [],
  chatSocketLists: [],
  unreadCounts: {},
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
      var setSocketLists = state.chatSocketLists;
      setSocketLists.push(action.data);

      return Object.assign({}, state, {
        chatSocketLists: setSocketLists,
      });

    case 'SET_CHAT_DATA_LISTS':
      var setDataLists = state.chatLogsLists;
      setDataLists.push(action.data);
      return Object.assign({}, state, {
        chatLogsLists: setDataLists,
      });

    case 'SET_UNREAD_COUNTS':
      const setKey = `room_${action.roomId}`;
      var setData = {};
      setData[setKey] = action.data;
      var setCounts = state.unreadCounts;
      setCounts = Object.assign({}, setCounts, setData);
      return Object.assign({}, state, {
        unreadCounts: setCounts,
      });

    case 'CHANGE_CHAT_DATA':
      var data = state.chatLogsLists[action.index];
      data = data.concat(action.data);

      var chagneLogs = state.chatLogsLists;
      chagneLogs.splice(action.index, 1, data);

      return Object.assign({}, state, {
        chatLogsLists: chagneLogs,
      });

    case 'CHANGE_UNREAD_COUNT':
      const changeKey = `room_${action.roomId}`;
      var changeCounts = state.unreadCounts;
      var changeData = {};
      var count = state.unreadCounts[changeKey];
      changeData[changeKey] = action.flag ? count : (count += 1);
      delete changeCounts[changeKey];
      changeCounts = Object.assign({}, changeCounts, changeData);
      return Object.assign({}, state, {
        unreadCounts: changeCounts,
      });

    case 'RESET_UNREAD_COUNT':
      const resetKey = `room_${action.roomId}`;
      var resetCounts = state.unreadCounts;
      var resetData = {};
      resetData[resetKey] = 0;
      delete resetCounts[resetKey];
      resetCounts[resetKey] = 0;
      resetCounts = Object.assign({}, resetCounts, resetData);
      return Object.assign({}, state, {
        unreadCounts: resetCounts,
      });

    default:
      return state;
  }
};
