import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { storeFactory } from '../testUtils/testUtils';
import { Provider } from 'react-redux';
import Nav from '../components/nav';

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    </Provider>
  );
  return wrapper;
};

describe('<Nav />', () => {
  describe('Login/Logout', () => {
    it('Login ボタンが表示されている', () => {
      const wrapper = setup();
      expect(wrapper.find('.fa-sign-in-alt').length).toEqual(1);
    });

    it('Logout ボタンが表示されている', () => {
      const initialState = {
        user: { id: 1, name: 'test' },
      };
      const wrapper = setup(initialState);
      expect(wrapper.find('.fa-sign-out-alt').length).toEqual(1);
    });
  });

  describe('各ページの遷移ボタン', () => {
    it('Chat ページ繊維ボタンがある', () => {
      const wrapper = setup();
      expect(wrapper.find('.fa-home').length).toEqual(1);
    });

    it('Friends ページ遷移ボタンがある', () => {
      const wrapper = setup();
      expect(wrapper.find('.fa-user-friends').length).toEqual(1);
    });

    it('ログインしているとき、MyUserInfo ページ遷移ボタンがある', () => {
      const initialState = {
        user: { id: 1, name: 'test' },
      };
      const wrapper = setup(initialState);
      expect(wrapper.find('.fa-user').length).toEqual(1);
    });

    it('ログインしていないとき、MyUserInfo ページ遷移ボタンがない', () => {
      const wrapper = setup();
      expect(wrapper.find('.fa-user').length).toEqual(0);
    });
  });
});
