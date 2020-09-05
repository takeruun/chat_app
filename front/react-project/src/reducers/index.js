import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './user';
import chat from './chat';
import room from './room';

export default combineReducers({ user, chat, room, form });
