import React from 'react';
import { mount } from 'enzyme';
import { storeFactory } from '../testUtils/testUtils';
import { Provider } from 'react-redux';
import ChatRoom from '../components/chat_room';

describe('<ChatRoom />', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      user: {
        id: 1,
        name: 'test',
        users: [
          { id: 1, name: 'user_1' },
          { id: 2, name: 'user_2' },
        ],
        rooms: [
          { id: 1, name: 'room_1' },
          { id: 2, name: '' },
        ],
        roomNames: ['', 'room_2'],
      },
      chat: {
        chatLogs: [
          { id: 1, user_id: 1, body: 'chat_1' },
          { id: 2, user_id: 2, body: 'chat_2' },
        ],
      },
    };
    const store = storeFactory(initialState);
    wrapper = mount(
      <Provider store={store}>
        <ChatRoom />
      </Provider>
    );
  });

  it('ChatRoom が表示されている', () => {
    expect(wrapper.find('.chat_room').length).toEqual(1);
  });

  it('users 分のログイン状況が表示されている', () => {
    expect(wrapper.find('.login_status').length).toEqual(1);
    expect(wrapper.find('.login_status_body_item').length).toEqual(2);
  });

  it('rooms 分のチャットルームが表示されている', () => {
    expect(wrapper.find('.room_lists').length).toEqual(1);
    expect(wrapper.find('.room_list_body_item').length).toEqual(2);
  });

  it('chatLogs 分メッセージが表示される', () => {
    expect(wrapper.find('.chat_logs').length).toEqual(1);
    expect(wrapper.find('.chat_log_body_item').length).toEqual(2);
  });
});
