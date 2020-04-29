import request from 'superagent';
export const API_REQUEST = 'API_REQUEST';
export const API_FAILUER = 'API_FAILUER';
export const CURRENT_USER = 'CURRENT_USER';
export const API_USERS = 'API_USERS';
export const API_LOGOUT = 'API_LOGOUT';
export const APPEAR_USERS = 'APPEAR_USERS';
export const APPEAR_SOCKET = 'APPEAR_SOCKET';

export function createSocketAppear(id) {
  return (dispatch) => {
    var Cable = require('actioncable');
    let appearcable = Cable.createConsumer('wss:localhost/api/cable');

    let appear = appearcable.subscriptions.create(
      {
        channel: 'AppearanceChannel',
        user_id: id,
      },
      {
        connected: () => {},
        received: (data) => {
          dispatch(appearUsers(data.user, true));
        },
        disconnected: () => {},
      }
    );
    dispatch(appearSocket(appear));
  };
}

export function signUp(data) {
  return (dispatch) => {
    dispatch(apiRequest());
    request
      .post('/api/signup')
      .send({
        email: data.email,
        password: data.password,
        username: data.name,
      })
      .end((err, res) => {
        if (!err && res.body.user) {
          dispatch(currentUser(res.body.user));
          dispatch(createSocketAppear(res.body.user.id));
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
      .get('/api/login')
      .query({
        email: data.email,
        password: data.password,
      })
      .end((err, res) => {
        if (!err && res.body.user) {
          dispatch(currentUser(res.body.user));
          localStorage.setItem('token', res.body.token);
          dispatch(createSocketAppear(res.body.user.id));
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
    request.post('/api/logout').end((err, res) => {
      if (!err && res.body.text) {
        appear.unsubscribe();
        dispatch(apiLogout(res.body.text));
        dispatch(appearUsers(1, false));
        localStorage.setItem('token', '');
      } else {
        dispatch(apiFailuer());
      }
    });
  };
}

export function getCurrentUser() {
  return (dispatch) => {
    dispatch(apiRequest());
    request
      .get('/api/user')
      .query({ token: localStorage.getItem('token') })
      //.set('Authorization', localStorage.getItem('token'))
      .end((err, res) => {
        if (!err && res.body.user) {
          dispatch(currentUser(res.body.user));
          dispatch(createSocketAppear(res.body.user.id));
        } else {
          dispatch(apiFailuer(err));
        }
      });
  };
}

export function getUsers() {
  return (dispatch) => {
    dispatch(apiRequest());
    request.get('/api/users').end((err, res) => {
      if (!err && res.body) {
        dispatch(apiUsers(res.body));
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

const currentUser = (data) => ({
  type: CURRENT_USER,
  data,
});

const apiUsers = (data) => ({
  type: API_USERS,
  data,
});

const apiLogout = (data) => ({
  type: API_LOGOUT,
  msg: data,
});

const appearSocket = (data) => ({
  type: APPEAR_SOCKET,
  data,
});

const appearUsers = (data, flag) => ({
  type: APPEAR_USERS,
  data,
  flag,
});
