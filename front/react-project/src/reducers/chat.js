const initialState = {
  chatLogs: [],
  chatLogsLists: [],
  chatSocketLists: [],
  unreadCounts: {},
  currentRoomIndex: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      const setMesKey = `room_${action.roomId}`;
      var logs = state.chatLogsLists[setMesKey];
      return Object.assign({}, state, {
        chatLogs: logs,
      });

    case 'SET_MESSAGE_LISTS':
      const setMesListsKey = `room_${action.roomId}`;
      var setMes = {};
      setMes[setMesListsKey] = action.data;
      var setMesLists = state.chatLogsLists;
      setMesLists = Object.assign({}, setMesLists, setMes);
      return Object.assign({}, state, {
        chatLogsLists: setMesLists,
      });

    case 'CHANGE_MESSAGE':
      const changeMesKey = `room_${action.roomId}`;
      var changeLogs = state.chatLogsLists;
      var setMes = {};
      var mes = state.chatLogsLists[changeMesKey];
      setMes[changeMesKey] = mes.concat(action.data);
      delete changeLogs[changeMesKey];
      changeLogs = Object.assign({}, changeLogs, setMes);
      console.log(mes, action.data, setMes, changeLogs);
      if (action.flag)
        return Object.assign({}, state, {
          chatLogsLists: changeLogs,
          chatLogs: changeLogs[changeMesKey],
        });
      else
        return Object.assign({}, state, {
          chatLogsLists: changeLogs,
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

    case 'SET_UNREAD_COUNTS':
      const setKey = `room_${action.roomId}`;
      var setData = {};
      setData[setKey] = action.data;
      var setCounts = state.unreadCounts;
      setCounts = Object.assign({}, setCounts, setData);
      return Object.assign({}, state, {
        unreadCounts: setCounts,
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
