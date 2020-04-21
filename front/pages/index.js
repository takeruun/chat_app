import React from 'react';
import { createStore } from 'redux';
import Home from './home';
import { Provider } from 'react-redux';
import reducer from '../src/reducers';

const store = createStore(reducer);
const index = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default index;
