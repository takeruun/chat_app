const initialState = {
  id: '',
  name: '',
  users: [],
  requesting: false,
  requested: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'API_REQUEST':
      return Object.assign({}, state, {
        requesting: true,
        requested: false,
        result: false,
      });

    case 'CURRENT_USER':
      return Object.assign({}, state, {
        requesting: false,
        requested: true,
        id: action.data.id,
        name: action.data.name,
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

    case 'API_LOGOUT':
      return Object.assign({}, state, {
        msg: action.msg,
      });

    case 'APPEAR_USERS':
      return Object.assign({}, state, {
        appearUsers: action.data,
      });

    default:
      return state;
  }
};
