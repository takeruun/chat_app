const initialState = {
  mentionList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MENTION_THREAD_LIST':
      return Object.assign({}, state, {
        mentionList: action.data,
      });

    case 'ADD_MENTION_THREAD_LIST':
      var addMention = state.mentionList;
      addMention = addMention.concat(action.data);
      return Object.assign({}, state, {
        mentionList: addMention,
      });

    default:
      return state;
  }
};
