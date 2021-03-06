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

    case 'SET_CURRENT_USER':
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

    case 'SET_USERS':
      return Object.assign({}, state, {
        requesting: false,
        requested: true,
        users: action.data,
      });

    case 'SET_USER':
      return Object.assign({}, state, {
        requesting: false,
        requested: true,
        user: action.data,
      });

    case 'SET_LOGOUT':
      return Object.assign({}, state, {
        id: '',
        msg: action.msg,
      });

    case 'SET_APPEAR_USERS':
      if (action.flag) {
        return Object.assign({}, state, {
          appearUsers: action.data,
        });
      } else {
        return Object.assign({}, state, {
          appearUsers: '',
        });
      }

    case 'SET_APPEAR_SOCKET':
      return Object.assign({}, state, {
        appearSocket: action.data,
      });

    default:
      return state;
  }
};
