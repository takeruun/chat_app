import React, { Component } from 'react';
import request from 'superagent';
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

  componentDidUpdate() {}

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
      <div className="talkRoom">
        <div className="loginStatus">
          <div className="loginStatusHeader">
            <p>ユーザーログイン状況</p>
          </div>
          <ul className="loginStatusBody">
            <LoginStatus />
          </ul>
        </div>
        <div className="chat">
          <div className="roomName">
            <p>チャットルーム:{this.state.roomName}</p>
          </div>
          <img className="backgroundImage" src="/images/blue.jpg" alt="背景" />
          <ul className="chatLogs" id="chatLogs">
            <ChatLogs />
          </ul>
          <input
            type="text"
            onKeyPress={(e) => this.handleChatInputKeyPress(e)} //Enter key でも button 効果
            value={this.state.currentChatMessage}
            onChange={(e) => this.updateCurrentChatMessage(e)}
            placeholder="メッセージどうぞ！"
            className="chatInput"
          />
          <button className="btnSend" onClick={(e) => this.handleSendEvent(e)}>
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
            .chatLogs {
              height: calc(100vh - 270px);
              overflow: auto;
            }
            .chat {
              min-width: 880px;
              width: calc(100vw - 360px);
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
              background-color: rgb(199, 192, 192);
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

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    userName: state.user.name,
    chatSocket: state.chat.chatSocket,
  };
}

export default connect(mapStateToProps)(ChatRoom);
