import request from 'superagent';
export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';
export const API_FAILUER = 'API_FAILUER';
export const API_USERS = 'API_USERS';

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

export function logout() {
  return (dispatch) => {
    dispatch(apiRequest());
    request.post('/api/logout').end((err, res) => {
      if (!err && res.body.text) {
        dispatch(apiSuccess(res.body.text));
      } else {
        dispatch(apiFailuer());
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

const apiUsers = (data) => ({
  type: API_USERS,
  data,
});

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

export function signUp(data) {
  console.log(data);
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
          dispatch(apiSuccess(res.body.user));
        } else {
          dispatch(apiFailuer(err));
        }
      });
  };
}
