import { Component } from "react";
import request from 'superagent';

export default class TalkRoom extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentChatMessage: '',
      chatLogs: [],
      users: [],
      user_id: '',
      partner_id: '',
      room_name: '',
      room_id: '',
      change_talk: false
    }
  };
}

apiGet