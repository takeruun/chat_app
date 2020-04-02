import { Component } from "react";
import request from 'superagent';

export default class TalkRoom extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentChatMessage: '',
      chatLogs: [],
      users: [],
      userId: '',
      partnerId: '',
      roomName: '',
      roomId: '',
      changeTalk: false
    }
  };

  componentDidMount(){
    
  }

  componentDidUpdate(){
    
  }

  render(){
    return(
    <div></div>
    )
  }
}