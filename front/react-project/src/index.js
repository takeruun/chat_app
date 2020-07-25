import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import ChatRoom from './components/chat_room';
import Friends from './components/friends';
import MyUserInfo from './components/my_user_info';
import User from './components/user';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const enhancer =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);

const store = createStore(reducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home component={ChatRoom} />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/signup'>
            <SignUp />
          </Route>
          <Route exact path='/friends'>
            <Home component={Friends} />
          </Route>
          <Route exact path='/user/:id'>
            <Home component={MyUserInfo} />
          </Route>
          <Route exact path='/users/:id'>
            <Home component={User} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
