import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginStatus from '../molecues/login_status';
import ChatLogs from '../molecues/chat_logs';
import ChatRooms from '../molecues/chat_rooms';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

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
      <div className='chat_page'>
        <div className='login_status'>
          <div className='header'>
            <p>ログイン状況</p>
          </div>
          <ul className='body'>
            <LoginStatus />
          </ul>
        </div>
        <div className='chat_rooms'>
          <ChatRooms />
        </div>
        <div className='chat'>
          <div className='room_name'>
            <p className='partner_name'>{this.props.partnerName}</p>
          </div>
          <ul className='chat_logs' id='chatLogs'>
            <ChatLogs />
          </ul>
          <div className='send_message'>
            <input
              type='text'
              onKeyPress={(e) => this.handleChatInputKeyPress(e)} //Enter key でも button 効果
              value={this.state.currentChatMessage}
              onChange={(e) => this.updateCurrentChatMessage(e)}
              placeholder='メッセージ'
              className='chat_input'
            />
            <FontAwesomeIcon
              icon={faAngleDoubleUp}
              size='3x'
              onClick={(e) => this.handleSendEvent(e)}
              className='btn_send'
            />
          </div>
        </div>
      </div>
    );
  }
}

ChatRoom.propTypes = {
  userId: propTypes.number.isRequired,
  userName: propTypes.string.isRequired,
  chatSocket: propTypes.object,
  partnerName: propTypes.string,
};

function mapStateToProps(state) {
  return {
    userId: Number(state.user.id),
    userName: state.user.name,
    chatSocket: state.chat.chatSocket,
    partnerName: state.chat.partnerName,
  };
}

export default connect(mapStateToProps)(ChatRoom);
