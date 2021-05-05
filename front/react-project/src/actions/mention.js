import request from 'superagent';
export const SET_MENTION_THREAD_LIST = 'SET_MENTION_THREAD_LIST';
export const ADD_MENTION_THREAD_LIST = 'ADD_MENTION_THREAD_LIST';
export const DELETE_MENTION_THREAD_LIST = 'DELETE_MENTION_THREAD_LIST';
const baseUrl = 'https://api.take-h'

export function apiCreateMentionThread(userId, toUserIds, content, roomId) {
  return (dispatch) => {
    request
      .post(baseUrl + '/api/v1/mention_threads')
      .send({
        thread: {
          current_user_id: userId,
          user_ids: toUserIds,
          content: content,
          room_id: roomId,
        },
      })
      .end((err, res) => {
        if (!err && res.body.msg) {
        } else if (!err && res.status === 200) {
          dispatch(addMentionThread(res.body.thread));
        }
      });
  };
}

export function apiGetMentionThread(userId) {
  return (dispacth) => {
    request
      .get(baseUrl + '/api/v1/mention_threads')
      .query({ current_user_id: userId })
      .end((err, res) => {
        if (!err && res.body.msg) {
        } else if (!err && res.status === 200) {
          dispacth(setMentionThread(res.body.threads));
        }
      });
  };
}

const setMentionThread = (data) => ({
  type: SET_MENTION_THREAD_LIST,
  data,
});

const addMentionThread = (data) => ({
  type: ADD_MENTION_THREAD_LIST,
  data,
});
