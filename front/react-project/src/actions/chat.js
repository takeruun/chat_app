import request from 'superagent';
import { apiGetRooms, apiGetRoomUserNames } from './user';
export const CHAT_DATA = 'CHAT_DATA';
export const CHAT_SOCKET = 'CHAT_SOCKET';
export const API_FAILUER = 'API_FAILUER';
export const GET_CHAT_SOCKET_LISTS = 'GET_CHAT_SOCKET_LISTS';

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

export function changeChatRoom(roomId, chatSocketLists) {
  return (dispatch) => {
    request.get('/api/v1/rooms/' + roomId).end((err, res) => {
      if (!err && res.status === 200) {
        dispatch(chatData(res.body.messages));
        const socket = chatSocketLists.filter((socket) => {
          return JSON.parse(socket.identifier).room_id === roomId
            ? socket
            : null;
        });
        if (socket[0]) dispatch(chatSocket(socket[0]));
        else
          dispatch(
            createSocketChat(roomId, res.body.messages, chatSocketLists)
          );
      } else {
        dispatch(apiFailuer(err));
      }
    });
  };
}

export function createSocketChat(roomId, chatLogs, chatSocketLists) {
  return (dispatch) => {
    var Cable = require('actioncable');
    let cable = Cable.createConsumer(
      'wss:' + window.location.host + '/api/v1/cable'
    );
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
    chatSocketLists.push(chats);
    dispatch(getChatSocketLists(chatSocketLists));
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

const getChatSocketLists = (data) => ({
  type: GET_CHAT_SOCKET_LISTS,
  data,
});

const apiFailuer = (err) => ({
  type: API_FAILUER,
  err,
});
