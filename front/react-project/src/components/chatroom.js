import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginStatus from '../molecues/loginstatus';
import ChatLogs from '../molecues/chatlogs';
class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: '',
    };
  }

  updateCurrentChatMessage(e) {
    this.setState({ currentChatMessage: e.target.value });
  }

  handleChatInputKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSendEvent(e);
    }
  }

  handleSendEvent(e) {
    e.preventDefault();
    //this.chats.create(this.state.currentChatMessage, this.state.userId);
    this.props.chatSocket.create(
      this.state.currentChatMessage,
      this.props.userId
    );
    this.setState({ currentChatMessage: '' });
  }

  render() {
    return (
      <div className="chat_room">
        <div className="login_status">
          <div className="header">
            <p>ユーザーログイン状況</p>
          </div>
          <ul className="body">
            <LoginStatus />
          </ul>
        </div>
        <div className="chat">
          <div className="room_name">
            <p>チャットルーム:{this.state.roomName}</p>
          </div>
          <img className="background_image" src="/images/blue.jpg" alt="背景" />
          <ul className="chat_logs" id="chatLogs">
            <ChatLogs />
          </ul>
          <input
            type="text"
            onKeyPress={(e) => this.handleChatInputKeyPress(e)} //Enter key でも button 効果
            value={this.state.currentChatMessage}
            onChange={(e) => this.updateCurrentChatMessage(e)}
            placeholder="メッセージどうぞ！"
            className="chat_input"
          />
          <button className="btn_send" onClick={(e) => this.handleSendEvent(e)}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    userName: state.user.name,
    chatSocket: state.chat.chatSocket,
  };
}

export default connect(mapStateToProps)(ChatRoom);
