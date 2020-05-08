import request from 'superagent';
export const CHAT_DATA = 'CHAT_DATA';
export const CHAT_SOCKET = 'CHAT_SOCKET';
export const PARTNER_NAME = 'PARTNER_NAME';

export function changeChatRoom(myId, partnerId) {
  return (dispatch) => {
    let n = myId;
    let m = partnerId;

    let roomName = 'room_';
    if (n > m) {
      roomName += String(`${m}${n}`);
    } else {
      roomName += String(`${n}${m}`);
    }
    dispatch(getPartnerName(partnerId));
    dispatch(getRoomId(roomName));
  };
}

function getRoomId(roomName) {
  return (dispatch) => {
    request
      .get('/api/rooms')
      .query({ roomName: roomName })
      .end((err, res) => {
        if (!err && res.body) {
          dispatch(chatData(res.body.chatdata));
        } else {
        }
        dispatch(createSocketChat(res.body.room_id, res.body.chatdata));
      });
  };
}

function createSocketChat(roomId, chatLogs) {
  return (dispatch) => {
    var Cable = require('actioncable');
    let cable = Cable.createConsumer('wss:localhost/api/cable');
    let chats = cable.subscriptions.create(
      {
        channel: 'ChatChannel',
        room_id: roomId,
      },
      {
        conneted: () => {},
        received: (data) => {
          //chatLogs.push(data);これでは再レンダリングされない
          chatLogs = chatLogs.concat(data);
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

function getPartnerName(partnerId) {
  return (dispatch) => {
    request
      .get('/api/partner')
      .query({ partner_id: partnerId })
      .end((err, res) => {
        if (!err && res.body) {
          dispatch(partnerName(res.body.user_name));
        }
      });
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

const partnerName = (data) => ({
  type: PARTNER_NAME,
  data,
});
