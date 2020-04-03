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
    this.apiGetUsers();
    this.apiGetCurrentUser(this.createSocketAppear.bind(this));
  }

  componentDidUpdate(){
    if(this.state.changeTalk){
      this.setState({changeTalk: false});
      this.apiGetRoom(this.createSocketCable.bind(this));
    }
  }

  createSocketAppear(){
    var Cable = require('actioncable');
    let appearcable = Cable.createConsumer('wss:localhost/api/cable');
    this.appear = appearcable.subscriptions.create({
      channel: 'AppearanceChannel',
      user_id: this.state.userId
    },{
      connected: () => {},
      received: (data) => {
        console.log(data);
        if(data.user.is_login == true){
          var element = document.getElementById(`loginUser_${data.user.id - 1}`)
          if(this.state.userId == data.user.id)
            element.style.backgroundColor = 'red';
          else
            element.style.backgroundColor = 'green';
        }
        else{
          var element = document.getElementById(`loginUser_${data.user.id - 1}`)
          element.style.backgroundColor = 'white';
        }
      }
    });
  }

  createSocketCable(){
    console.log('userID:' + this.state.userId + ' partnerID:' + this.state.partnerId + 'とsocket作成');
    console.log('roomID:' + this.state.roomId + ' roomName:' + this.state.roomName);
    var Cable = require('actioncable');
    let cable = Cable.createConsumer('wss:localhost/api/cable');
    console.log(cable);
    this.chats = cable.subscriptions.create({　
      channel: 'ChatChannel',
      room_id: this.state.roomId
    },{
      conneted: () => {},
      received: (data) => {
        let chatLogs = this.state.chatLogs;
        console.log(data);
        chatLogs.push(data);
        console.log(chatLogs);
        this.setState({ chatLogs: chatLogs});
      },
      create: function(chatContent, id){ //this.chats.createの引数がchatContent
        this.perform('create', {
        user_id: id,
        body: chatContent
        });
      },
      disconnected: () => {
        cable.subscriptions.consumer.disconnect();
        console.log(this.state.roomName + 'から出ます');
      }
    });
  }

  apiGetCurrentUser(callback){
    request
      .get('/api/user')
      .withCredentials()
      .end((err, res) => {
        if(err){
          console.log(err);
        }
        if(res.body.user){
          this.setState({ userId: res.body.user.id });
        }
        callback();
      });
  }

  apiGetUsers(){
    request
      .get('/api/users')
      .end((err, res) => {
        if(err){
          console.log(err);
        }
        console.log(res);
        if(res.body){
          this.setState({users: res.body});
        }
      });
  }

  apiGetRoom(callback){
    request
      .get('/api/rooms')
      .query({roomName: this.state.roomName})
      .end((err, res) => {
        if(err){
          console.log(err);
        }
        console.log(res);
        if(res.body){
          console.log('--room情報取得--')
          console.log(res.body.chatdata)
          console.log(res.body.room_id)
          console.log('---------------')
          this.setState({chatLogs: res.body.chatdata, roomId: res.body.room_id});
        }
        callback();
      });
  }

  changeTalkRoom(parID){
    if(this.chats){
      this.chats.disconnected();
    }
    this.setState({partnerId: parID});
    let n = this.state.userId;
    let m = parID;
    console.log('partnerID:'+m+' userID:'+n);
    
    let roomName = 'room_';
    if(n > m){
      roomName += String(`${m}${n}`);
      console.log(roomName);
    }
    else{
      roomName += String(`${n}${m}`);
      console.log(roomName);
    }
    this.setState({roomName: roomName});
    this.setState({changeTalk: true});
  }

  updateCurrentChatMessage(e){
    this.setState({currentChatMessage: e.target.value});
  }

  handleChatInputKeyPress(e){
    if(e.key === 'Enter'){
      this.handleSendEvent(e);
    }
  }

  handleSendEvent(e){
    e.preventDefault();
    this.chats.create(this.state.currentChatMessage, this.state.userId);
    this.setState({currentChatMessage: ''});
  }

  renderChatLog(){
    return this.state.chatLogs.map((el) => {
      return(
        <li key={`chat_${el.id}`}>
          {(() => {
            if(el.user_id == this.state.userId){
              return(
                <div className="chatBox">
                  <img className="meImage" src="/images/a.jpg"/>
                  <p className="meChatMessage">{el.body}</p>
                </div>
              );
            }
            else{
              return(
                <div className="chatBox">
                  <img className="partnerImage" src="/images/a.jpg"/>
                  <p className="partnerChatMessage">{el.body}</p>
                </div>
              );
            }
          })()}
          <style>{`
          li {
            list-style: none;
          }
          p{
            padding: 0px;
            margin: 0px;
          }
          .chatBox{
            margin: auto;
            width: 760px;
          }
          .meImage{
            width: 48px;
            height: 48px;
            border-radius: 50%;
            float: left;
          }
          .partnerImage{
            width: 48px;
            height: 48px;
            border-radius: 50%;
            float: right;
          }
          .meChatMessage{
            background-color: white;
            width: 350px;
            height: 80px;
            border-radius: 15px;
            padding-top: 5px;
            padding-left: 15px;
            margin-left: 40px;
            margin-bottom: 50px;
            font-size: 18px;
            display: inline-block;
          }
          .partnerChatMessage{
            background-color: white;
            width: 350px;
            height: 80px;
            border-radius: 15px;
            padding-top: 5px;
            padding-left: 15px;
            margin-left: 300px;
            margin-bottom: 50px;
            font-size: 18px;
            display: inline-block;
          }
          `}</style>
        </li>
      );
    });
  }

  renderUsers(){
    return this.state.users.map((user, index) => {
      return(
        <li className="loginStatusBodyItem" key={`user_${index}`}>
          <div className="loginStatusBodyItemImage">
            <img src="/images/blue.jpg" onClick={(e) => this.changeTalkRoom(user.id)}/>
          </div>
          <div className="loginStatusBodyItemName">{user.name}</div>
          <div className="loginStatusBodyItemStaus">
            <span id={`loginUser_${index}`}></span>
          </div>
          <style>{`
          .loginStatusBodyItem {
            display: flex;
            margin-bottom: 20px;
          }
          .loginStatusBodyItemImage {
            width: 40px;
            height: 40px;
            padding-right: 10px;
          }
          .loginStatusBodyItemImage :hover {
            cursor: pointer;
          }
          .loginStatusBodyItemImage img {
            width: 100%;
            height: 100%;
            obect-fit: cover;
            border-radius: 100px;
          }
          .loginStatusBodyItemName {
            display: flex;
            align-items: center;
            width: 170px;
          }
          .loginStatusBodyItemStaus {
            width: 20px;
            display: flex;
            align-items: center;
          }
          .loginStatusBodyItemStaus span{
            display: block;
            border: 1px solid #ccc;
            width: 10px;
            height: 10px;
            border-radius: 10px;
          }
          `}</style>
        </li>
      );
    });
    
  }

  render(){
    return(
    <div className="talkRoom">
      <div className="loginStatus">
        <div className="loginStatusHeader">
          <p>ユーザーログイン状況</p>
        </div>
        <ul className="loginStatusBody">
          {this.renderUsers()}
        </ul>
      </div>
      <div className="chat">
        <div className="roomName">
          <p>チャットルーム:{this.state.roomName}</p>
        </div>
        <img className="backgroundImage" src="/images/blue.jpg"/>
        <ul className="chatLogs">
          {this.renderChatLog()}
        </ul>
        <input 
          type="text"
          onKeyPress={ (e) => this.handleChatInputKeyPress(e) } //Enter key でも button 効果
          value={ this.state.currentChatMessage }
          onChange={ (e) => this.updateCurrentChatMessage(e) } 
          placeholder="メッセージどうぞ！" 
          className="chatInput"/>
        <button
          className="btnSend"
          onClick={(e) => this.handleSendEvent(e)}>
            Send
        </button>
      </div>
      <style>{`
        p {
          padding: 0;
          margin: 0;
        }
        .talkRoom {
          display: flex;
        }
        .loginStatus {
          width: 280px;
        }
        .loginStatusHeader {
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid #ccc;
        }
        .loginStatusBody {
          padding: 20px;
        }
        ul {
          height: calc(100vh - 270px);
          overflow: auto;
          scrollBottom: 0;
        }
        .chat {
          min-width: 880px;
          width: calc(100vw - 280px);
          height: 100vh;
          position: relative;
        }
        .backgroundImage {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: -1;
        }
        .roomName {
          background-color: gray;
          padding-left: 60px;
        }
        .roomName p {
          padding-top: 20px;
          padding-bottom: 20px;
        }
      `}</style>
    </div>
    );
  }
}