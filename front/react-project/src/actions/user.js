import request from 'superagent';
export const API_REQUEST = 'API_REQUEST';
export const API_FAILUER = 'API_FAILUER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_USERS = 'SET_USERS';
export const SET_LOGOUT = 'SET_LOGOUT';
export const SET_APPEAR_USERS = 'SET_APPEAR_USERS';
export const SET_USER = 'SET_USER';
export const SET_APPEAR_SOCKET = 'SET_APPEAR_SOCKET';
export const SET_ROOMS = 'SET_ROOMS';
export const SET_ROOM_USER_NAMES = 'SET_ROOM_USER_NAMES';

export function apiCreateSocketAppear(id) {
  return (dispatch) => {
    var Cable = require('actioncable');
    let appearcable = Cable.createConsumer('wss:localhost/api/v1/cable');

    let appear = appearcable.subscriptions.create(
      {
        channel: 'AppearanceChannel',
        user_id: id,
      },
      {
        connected: () => {},
        received: (data) => {
          dispatch(setAppearUsers(data.user, true));
        },
        disconnected: () => {},
      }
    );
    dispatch(setAppearSocket(appear));
  };
}

export function signUp(data) {
  return (dispatch) => {
    dispatch(apiRequest());
    request
      .post('/api/v1/signup')
      .send({
        email: data.email,
        password: data.password,
        username: data.name,
      })
      .end((err, res) => {
        if (!err && res.body.user) {
          dispatch(setCurrentUser(res.body.user));
          dispatch(apiCreateSocketAppear(res.body.user.id));
        } else {
          dispatch(apiFailuer(err));
        }
      });
  };
}

export function login(data) {
  return (dispatch) => {
    dispatch(apiRequest());
    request
      .get('/api/v1/login')
      .query({ user: { email: data.email, password: data.password } })
      .end((err, res) => {
        if (!err && res.body.user) {
          dispatch(setCurrentUser(res.body.user));
          localStorage.setItem('token', res.body.token);
          dispatch(apiCreateSocketAppear(res.body.user.id));
        } else if (!err) {
          dispatch(apiFailuer(res));
        } else {
          dispatch(apiFailuer(err));
        }
      });
  };
}

export function logout(appear) {
  return (dispatch) => {
    dispatch(apiRequest());
    request.post('/api/v1/logout').end((err, res) => {
      if (!err && res.body.msg) {
        appear.unsubscribe();
        dispatch(setLogout(res.body.msg));
        dispatch(setAppearUsers(1, false));
        localStorage.setItem('token', '');
      } else {
        dispatch(apiFailuer());
      }
    });
  };
}

export function apiGetCurrentUser() {
  return (dispatch) => {
    dispatch(apiRequest());
    request
      .get('/api/v1/user')
      .query({ token: localStorage.getItem('token') })
      //.set('Authorization', localStorage.getItem('token'))
      .end((err, res) => {
        if (!err && res.body.user) {
          dispatch(setCurrentUser(res.body.user));
          dispatch(apiCreateSocketAppear(res.body.user.id));
          dispatch(apiGetRooms(res.body.user.id));
        } else {
          dispatch(apiFailuer(err));
        }
      });
  };
}

export function apiGetUsers() {
  return (dispatch) => {
    dispatch(apiRequest());
    request.get('/api/v1/users').end((err, res) => {
      if (!err && res.body) {
        dispatch(setUsers(res.body));
      } else {
        dispatch(apiFailuer(err));
      }
    });
  };
}

export function getUser(id) {
  return (dispacth) => {
    dispacth(apiRequest());
    request.get('/api/v1/users/' + id).end((err, res) => {
      if (!err && res.status === 200) {
        dispacth(setUser(res.body.user));
      } else {
        dispacth(apiFailuer());
      }
    });
  };
}

function apiGetRooms(id) {
  return (dispatch) => {
    request
      .get('/api/v1/rooms')
      .query({ current_user_id: id })
      .end((err, res) => {
        if (!err && res.body.msg) {
        } else if (!err && res.status === 200) {
          dispatch(setRooms(res.body.rooms));
          dispatch(setRoomUserNames(res.body.room_names));
        } else {
          dispatch(apiFailuer(err));
        }
      });
  };
}

const apiRequest = () => ({
  type: API_REQUEST,
});

const apiFailuer = (err) => ({
  type: API_FAILUER,
  err,
});

const setCurrentUser = (data) => ({
  type: SET_CURRENT_USER,
  data,
});

const setUsers = (data) => ({
  type: SET_USERS,
  data,
});

const setUser = (data) => ({
  type: SET_USER,
  data,
});

const setLogout = (data) => ({
  type: SET_LOGOUT,
  msg: data,
});

const setAppearSocket = (data) => ({
  type: SET_APPEAR_SOCKET,
  data,
});

const setAppearUsers = (data, flag) => ({
  type: SET_APPEAR_USERS,
  data,
  flag,
});

export const setRooms = (data) => ({
  type: SET_ROOMS,
  data,
});

export const setRoomUserNames = (data) => ({
  type: SET_ROOM_USER_NAMES,
  data,
});
