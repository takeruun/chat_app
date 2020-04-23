const initialState = {
  users: [],
  requesting: false,
  requested: false,
  result: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'API_REQUEST':
      return Object.assign({}, state, {
        requesting: true,
        requested: false,
        result: false,
      });

    case 'API_SUCCESS':
      return Object.assign({}, state, {
        requesting: false,
        requested: true,
        result: action,
      }); //ActionCreater の id, name が action.id, action.name になっている

    case 'API_FAILUER':
      return Object.assign({}, state, {
        requesting: false,
        requested: false,
        result: action.err,
      });

    case 'API_USERS':
      return Object.assign({}, state, {
        requesting: false,
        requested: true,
        users: action.data,
      });

    default:
      return state;
  }
};
