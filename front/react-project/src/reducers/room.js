const initialState = {
  roomId: '',
  rooms: [],
  roomNames: {},
  requesting: false,
  requested: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROOMS':
      return Object.assign({}, state, {
        rooms: action.data,
      });

    case 'ADD_ROOM':
      var addRooms = state.rooms;
      addRooms = addRooms.concat(action.data);
      return Object.assign({}, state, {
        rooms: addRooms,
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
