import React from 'react';
import { mount } from 'enzyme';
import { storeFactory } from '../testUtils/testUtils';
import { Provider } from 'react-redux';
import RoomLists from '../molecues/room_lists';

describe('<RoomLists />', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      user: {
        id: 1,
        name: 'test_1',
        users: [
          { id: 1, name: 'test_1' },
          { id: 2, name: 'test_2' },
          { id: 3, name: 'test_3' },
        ],
        rooms: [
          { id: 1, name: '' },
          { id: 2, name: 'room_1' },
          { id: 3, name: '' },
          { id: 4, name: 'room_2' },
        ],
        roomNames: ['user_2', 'room_1', 'user_3', 'room_2'],
      },
    };
    const store = storeFactory(initialState);
    wrapper = mount(
      <Provider store={store}>
        <RoomLists />
      </Provider>
    );
  });

  it('RoomLists が表示されている', () => {
    expect(wrapper.find('.header').length).toEqual(1);
  });

  it('チャットルームが表示されている', () => {
    expect(wrapper.find('.room_list_body_item').length).toEqual(4);
  });

  it('user_2 との個人チャットが表示されている', () => {
    expect(wrapper.find('.room_user_2').length).toEqual(1);
  });

  it('user_3 との個人チャットが表示されている', () => {
    expect(wrapper.find('.room_user_3').length).toEqual(1);
  });

  it('room_1 のグループチャットが表示されている', () => {
    expect(wrapper.find('.room_room_1').length).toEqual(1);
  });
});
