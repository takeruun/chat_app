export const LOGOUT = 'LOGOUT';
export const GET_USERS = 'GET_USERS';
export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';
export const API_FAILUER = 'API_FAILUER';

import request from 'superagent';

export function login(email, password) {
  return (dispatch) => {
    dispatch(apiRequest());
    request
      .get('/api/login')
      .query({
        email: email,
        password: password,
      })
      .end((err, res) => {
        if (!err && res.body.user) {
          dispatch(apiSuccess(res.body.user));
        } else if (!err) {
          dispatch(apiFailuer(res));
        } else {
          dispatch(apiFailuer(err));
        }
      });
  };
}

export function getCurrentUser() {
  return (dispatch) => {
    dispatch(apiRequest());
    request.get('/api/user').end((err, res) => {
      if (!err && res.body.user) {
        dispatch(apiSuccess(res.body.user));
      } else {
        dispatch(apiFailuer(err));
      }
    });
  };
}

const apiRequest = () => ({
  type: API_REQUEST,
});

const apiSuccess = (data) => ({
  type: API_SUCCESS,
  id: data.id,
  name: data.name,
});

const apiFailuer = (err) => ({
  type: API_FAILUER,
  err,
});

export const logout = () => ({
  type: LOGOUT,
});

export const getUsers = () => ({
  type: GET_USERS,
});
