import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './user';
import chat from './chat';

export default combineReducers({ user, chat, form });
