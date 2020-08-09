import request from 'superagent';
import { apiGetRooms, apiGetRoomUserNames } from './user';
export const CHAT_DATA = 'CHAT_DATA';
export const CHAT_SOCKET = 'CHAT_SOCKET';
export const API_FAILUER = 'API_FAILUER';

export function createRoom(ids, rooms, roomNames, name = '') {
  return (dispatch) => {
    request
      .post('/api/v1/rooms')
      .send({ room: { user_ids: ids, name: name } })
      .end((err, res) => {
        if (!err && res.body.msg) {
          console.log(res.body.msg);
        } else if (!err && res.status === 200) {
          rooms = rooms.concat(res.body.room);
          roomNames = roomNames.concat(res.body.room_name);
          dispatch(apiGetRooms(rooms));
          dispatch(apiGetRoomUserNames(roomNames));
          dispatch(createSocketChat(res.body.room.id));
        } else {
          dispatch(apiFailuer(err));
        }
      });
  };
}

export function changeChatRoom(roomId) {
  return (dispatch) => {
    request.get('/api/v1/rooms/' + roomId).end((err, res) => {
      if (!err && res.status === 200) {
        dispatch(chatData(res.body.messages));
        dispatch(createSocketChat(roomId, res.body.messages));
      } else {
        dispatch(apiFailuer(err));
      }
    });
  };
}

export function createSocketChat(roomId, chatLogs) {
  return (dispatch) => {
    var Cable = require('actioncable');
    let cable = Cable.createConsumer('wss:localhost/api/v1/cable');
    let chats = cable.subscriptions.create(
      {
        channel: 'ChatChannel',
        room_id: roomId,
      },
      {
        conneted: () => {},
        received: (data) => {
          //chatLogs.push(data);これでは再レンダリングされない
          if (roomId === data.room_id) chatLogs = chatLogs.concat(data);
          else chatLogs.push(data);
          dispatch(chatData(chatLogs));
        },
        create: function (chatContent, id) {
          //this.chats.createの引数がchatContent, id
          this.perform('create', {
            user_id: id,
            body: chatContent,
          });
        },
        disconnected: () => {
          cable.subscriptions.consumer.disconnect();
        },
      }
    );
    dispatch(chatSocket(chats));
  };
}

const chatData = (data) => ({
  type: CHAT_DATA,
  data,
});

const chatSocket = (data) => ({
  type: CHAT_SOCKET,
  data,
});

const apiFailuer = (err) => ({
  type: API_FAILUER,
  err,
});
