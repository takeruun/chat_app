import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/home';
import ChatRoom from '../components/chat_room';
import MyUserInfo from '../components/my_user_info';
import Friends from '../components/friends';
import { storeFactory } from '../testUtils/testUtils';
import { Provider } from 'react-redux';

describe('<Home />', () => {
  describe('<Home {ChatRoom}/>', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {};
      const store = storeFactory(initialState);
      wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Home component={ChatRoom} />
          </BrowserRouter>
        </Provider>
      );
    });

    it('Home が表示されている', () => {
      expect(wrapper.find('.home').length).toEqual(1);
    });

    it('Nav が表示されている', () => {
      expect(wrapper.find('.nav').length).toEqual(1);
    });

    it('ChatRoom が表示されている', () => {
      expect(wrapper.find('.chat_room').length).toEqual(1);
    });
  });

  describe('<Home {Friends}/>', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {};
      const store = storeFactory(initialState);
      wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Home component={Friends} />
          </BrowserRouter>
        </Provider>
      );
    });

    it('Homeが表示されている', () => {
      expect(wrapper.find('.home').length).toEqual(1);
    });

    it('Navが表示さsれている', () => {
      expect(wrapper.find('.nav').length).toEqual(1);
    });

    it('Friends が表示されている', () => {
      expect(wrapper.find('.friends_page').length).toEqual(1);
    });
  });

  describe('<Home {MyUserInfo}/>', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {};
      const store = storeFactory(initialState);
      wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Home component={MyUserInfo} />
          </BrowserRouter>
        </Provider>
      );
    });

    it('Homeが表示されている', () => {
      expect(wrapper.find('.home').length).toEqual(1);
    });

    it('Navが表示さsれている', () => {
      expect(wrapper.find('.nav').length).toEqual(1);
    });

    it('Friends が表示されている', () => {
      expect(wrapper.find('.user_page').length).toEqual(1);
    });
  });
});
