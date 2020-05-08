const initialState = {
  chatLogs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHAT_DATA':
      return Object.assign({}, state, {
        chatLogs: action.data,
      });

    case 'CURRENT_CHAT_DATA':
      return Object.assign({}, state, {
        chatLogs: action.data,
      });

    case 'CHAT_SOCKET':
      return Object.assign({}, state, {
        chatSocket: action.data,
      });

    case 'PARTNER_NAME':
      return Object.assign({}, state, {
        partnerName: action.data,
      });

    default:
      return state;
  }
};
