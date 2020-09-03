const initialState = {
  id: '',
  name: '',
  users: [],
  rooms: [],
  roomLists: [],
  roomNames: {},
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

    case 'SET_ROOMS':
      return Object.assign({}, state, {
        rooms: action.data,
      });

    case 'SET_ROOM_NAMES':
      return Object.assign({}, state, {
        roomNames: action.data,
      });

    case 'ADD_ROOM_NAME':
      const addNameKey = `room_${action.roomId}`;
      var name = {};
      name[addNameKey] = action.data;
      var addNames = state.roomNames;
      addNames = Object.assign({}, addNames, name);
      return Object.assign({}, state, {
        roomNames: addNames,
      });

    default:
      return state;
  }
};
