import {
  LOGOUT,
  GET_USERS,
  API_REQUEST,
  API_SUCCESS,
  API_FAILUER,
} from '../actions';

const initialState = {
  userId: '',
  userName: '',
  users: [],
  requesting: false,
  requested: false,
  saveResult: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
        requested: false,
        saveResult: false,
      });

    case API_SUCCESS:
      return Object.assign({}, state, {
        userId: action.id,
        userName: action.name,
        requesting: false,
        requested: true,
        savaResult: true,
      }); //ActionCreater の id, name が action.id, action.name になっている

    case API_FAILUER:
      return Object.assign({}, state, {
        requesting: false,
        requested: false,
        saveResult: action.err,
      });

    case LOGOUT:
      return Object.assign({}, state, { userId: '', userName: '' });

    default:
      return state;
  }
};
