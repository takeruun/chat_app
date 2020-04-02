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

  componentDidMount(){
    this.apiCurrentUser();
  }

  apiCurrentUser(){
    request
      .get('/api/users')
      .withCredentials()
      .end((err, res)=> {
        if(err){
          console.log(err);
        }
        console.log(res);
        if(res.body.user){
          this.setState({user_id: res.body.user.id});
        }
      })
  }

  render(){
    return(
    <div>{this.state.user_id}</div>
    )
  }
}