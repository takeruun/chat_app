import request from 'superagent';
import { apiCreateSocketChat, apiGetUnreadCount } from './chat';
export const SET_ROOMS = 'SET_ROOMS';
export const ADD_ROOM = 'ADD_ROOM';
export const SET_ROOM_NAMES = 'SET_ROOM_NAMES';
export const ADD_ROOM_NAME = 'ADD_ROOM_NAME';
export const API_FAILUER = 'API_FAILUER';

export function apiGetRooms(id) {
  var names = {};
  return (dispatch) => {
    request
      .get('/api/v1/rooms')
      .query({ current_user_id: id })
      .end((err, res) => {
        if (!err && res.body.msg) {
        } else if (!err && res.status === 200) {
          dispatch(setRooms(res.body.rooms));
          res.body.rooms.forEach((room, i) => {
            dispatch(apiCreateSocketChat(room.id, id));
            dispatch(apiGetUnreadCount(room.id, id));
          });
          res.body.room_names.forEach((name, i) => {
            const key = `room_${res.body.rooms[i].id}`;
            names[key] = name;
          });
          dispatch(setRoomNames(names));
        } else {
          dispatch(apiFailuer(err));
        }
      });
  };
}

export function apiCreateRoom(ids, name = '') {
  return (dispatch) => {
    request
      .post('/api/v1/rooms')
      .send({ room: { user_ids: ids, name: name } })
      .end((err, res) => {
        if (!err && res.body.msg) {
          console.log(res.body.msg);
        } else if (!err && res.status === 200) {
          dispatch(addRoom(res.body.room));
          dispatch(addRoomName(res.body.room_name, res.body.room.id));
          dispatch(apiCreateSocketChat(res.body.room.id, ids[0]));
        } else {
          dispatch(apiFailuer(err));
        }
      });
  };
}

export const setRooms = (data) => ({
  type: SET_ROOMS,
  data,
});

export const addRoom = (data) => ({
  type: ADD_ROOM,
  data,
});

export const setRoomNames = (data) => ({
  type: SET_ROOM_NAMES,
  data,
});

export const addRoomName = (data, roomId) => ({
  type: ADD_ROOM_NAME,
  data,
  roomId,
});

const apiFailuer = (err) => ({
  type: API_FAILUER,
  err,
});
