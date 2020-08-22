import request from 'superagent';
import { setRooms, setRoomUserNames } from './user';
export const SET_CHAT_DATA = 'SET_CHAT_DATA';
export const SET_CHAT_SOCKET = 'SET_CHAT_SOCKET';
export const API_FAILUER = 'API_FAILUER';
export const SET_CHAT_SOCKET_LISTS = 'SET_CHAT_SOCKET_LISTS';
export const SET_CHAT_DATA_LISTS = 'SET_CHAT_DATA_LISTS';
export const SET_UNREAD_COUNTS = 'SET_UNREAD_COUNTS';

export function apiCreateRoom(ids, rooms, roomNames, name = '') {
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
          dispatch(setRooms(rooms));
          dispatch(setRoomUserNames(roomNames));
          dispatch(apiCreateSocketChat(res.body.room.id));
        } else {
          dispatch(apiFailuer(err));
        }
      });
  };
}

export function apiChangeChatRoom(roomId, chatSocketLists, chatLogsLists) {
  return (dispatch) => {
    request.get('/api/v1/rooms/' + roomId).end((err, res) => {
      if (!err && res.status === 200) {
        var currentRoomIndex = Number(
          document.getElementsByClassName('current_room')[0].classList[2]
        );
        dispatch(setChatData(chatLogsLists[currentRoomIndex]));
        const socket = chatSocketLists.filter((socket) => {
          return JSON.parse(socket.identifier).room_id === roomId
            ? socket
            : null;
        });
        dispatch(setChatSocket(socket[0]));
      } else {
        dispatch(apiFailuer(err));
      }
    });
  };
}

export function apiCreateSocketChat(
  roomId,
  chatLogsLists,
  chatSocketLists,
  index,
  rooms,
  userId
) {
  return (dispatch) => {
    var currentFlag = false;
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
          const currentRoomId = Number(
            document
              .getElementsByClassName('current_room')[0]
              .getAttribute('id')
          );
          if (roomId === currentRoomId) {
            currentFlag = true;
            const currentRoomIndex = Number(
              document.getElementsByClassName('current_room')[0].classList[2]
            );
            chatLogsLists[currentRoomIndex] = chatLogsLists[
              currentRoomIndex
            ].concat(data);
            dispatch(setChatData(chatLogsLists[currentRoomIndex]));
          } else {
            currentFlag = false;
            const roomIndex = rooms.findIndex(
              (room) => room.id === data.room_id
            );
            chatLogsLists[roomIndex].push(data);
            setChatData(chatLogsLists[roomIndex]);
          }
          dispatch(apiUpdateUnreadCounts(currentFlag, data));
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
    dispatch(apiGetChatData(roomId, chatLogsLists, index));
    dispatch(setChatSocketLists(chatSocketLists));
    apiGetUnreadCount(roomId, userId);
  };
}

function apiGetChatData(roomId, chatLogsLists, index) {
  return (dispatch) => {
    request.get('/api/v1/rooms/' + roomId).end((err, res) => {
      if (!err && res.status === 200) {
        res.body.messages.forEach((chat) => {
          chatLogsLists[index].push(chat);
        });
        dispatch(setChatDataLists(chatLogsLists));
      } else {
        dispatch(apiFailuer(err));
      }
    });
  };
}

function apiGetUnreadCount(roomId, userId) {
  request
    .get('/api/v1/unread_counts')
    .query({ unread_count: { room_id: roomId, user_id: userId } })
    .end((err, res) => {
      if (!err && res.status === 200) {
      }
    });
}

function apiUpdateUnreadCounts(flag, message) {
  return (dispatch) => {
    request
      .put('/api/v1/unread_counts/' + message.unread_count_id)
      .send({ unrad_count: { flag: flag, message_id: message.id } })
      .end((err, res) => {
        if (!err && res.status === 200) {
        }
      });
  };
}

const setChatData = (data) => ({
  type: SET_CHAT_DATA,
  data,
});

const setChatDataLists = (data) => ({
  type: SET_CHAT_DATA_LISTS,
  data,
});

const setChatSocket = (data) => ({
  type: SET_CHAT_SOCKET,
  data,
});

const setChatSocketLists = (data) => ({
  type: SET_CHAT_SOCKET_LISTS,
  data,
});

export const setUnreadCounts = (data) => ({
  type: SET_UNREAD_COUNTS,
  data,
});

const apiFailuer = (err) => ({
  type: API_FAILUER,
  err,
});
