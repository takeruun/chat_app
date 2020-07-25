import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginStatus from '../molecues/login_status';
import ChatLogs from '../molecues/chat_logs';
import RoomLists from '../molecues/room_lists';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { MentionsInput, Mention } from 'react-mentions';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: '',
      shiftKeyFlag: false,
    };
    this.updateCurrentChatMessage = this.updateCurrentChatMessage.bind(this);
    this.handleChatInputKeyPress = this.handleChatInputKeyPress.bind(this);
    this.handleSendEvent = this.handleSendEvent.bind(this);
    this.toMention = this.toMention.bind(this);
    this.keyShiftFlag = this.keyShiftFlag.bind(this);
  }

  updateCurrentChatMessage(e) {
    this.setState({
      currentChatMessage: e.target.value,
    });
  }

  handleChatInputKeyPress(e) {
    var msg = e.target.value;
    if (this.state.shiftKeyFlag && e.key === 'Enter') {
      msg += '\n';
    } else if (e.key === 'Enter') {
      this.handleSendEvent(e);
      msg = '';
    }
    this.setState({ currentChatMessage: msg, shiftKeyFlag: false });
  }

  keyShiftFlag(e) {
    if (e.key === 'Shift') this.setState({ shiftKeyFlag: true });
  }

  handleSendEvent(e) {
    e.preventDefault();
    this.props.chatSocket.create(
      this.state.currentChatMessage,
      this.props.userId
    );
    this.setState({ currentChatMessage: '' });
  }

  toMention(id) {}

  render() {
    var { users } = this.props;
    users = users.map((user) => ({
      id: user.id,
      display: user.name,
    }));
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
          <RoomLists />
        </div>
        <div className='chat'>
          <div className='room_name'>
            <p className='partner_name'>{this.props.partnerName}</p>
          </div>
          <ul className='chat_logs' id='chatLogs'>
            <ChatLogs />
          </ul>
          <div className='send_message'>
            <MentionsInput
              onChange={this.updateCurrentChatMessage}
              value={this.state.currentChatMessage}
              placeholder='メッセージをどうぞ'
              onKeyDown={this.keyShiftFlag}
              className='mentionedFriend'
              onKeyPress={this.handleChatInputKeyPress}
            >
              <Mention
                type='user'
                trigger='@'
                data={users}
                displayTransform={(id, display) => `@${display}`}
                onAdd={(id) => this.toMention(id)}
              />
            </MentionsInput>
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
  users: propTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    userId: Number(state.user.id),
    userName: state.user.name,
    chatSocket: state.chat.chatSocket,
    partnerName: state.chat.partnerName,
    users: state.user.users,
  };
}

export default connect(mapStateToProps)(ChatRoom);
