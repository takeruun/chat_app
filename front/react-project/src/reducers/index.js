import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './user';
import chat from './chat';
import room from './room';
import mention from './mention';

export default combineReducers({ user, chat, room, mention, form });
