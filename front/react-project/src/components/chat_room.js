import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginStatus from '../molecues/login_status';
import ChatLogs from '../molecues/chat_logs';
import RoomLists from '../molecues/room_lists';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { MentionsInput, Mention } from 'react-mentions';
import request from 'superagent';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: '',
      shiftKeyFlag: false,
      workId: '',
      users: [],
    };
    this.updateCurrentChatMessage = this.updateCurrentChatMessage.bind(this);
    this.handleChatInputKeyPress = this.handleChatInputKeyPress.bind(this);
    this.handleSendEvent = this.handleSendEvent.bind(this);
    this.toMention = this.toMention.bind(this);
    this.keyShiftFlag = this.keyShiftFlag.bind(this);
    this.handleWorkingTime = this.handleWorkingTime.bind(this);
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
    if (!(e.target.value === '@勤務開始' || e.target.value === '@勤務終了'))
      this.props.chatSocket.create(
        this.state.currentChatMessage,
        this.props.userId
      );
    this.setState({ currentChatMessage: '' });
  }

  toMention() {}

  handleWorkingTime(flag) {
    flag === 0
      ? request
          .post('/api/v1/works/')
          .send({
            work: { status: 'work', user_id: this.props.userId },
          })
          .end((err, res) => {
            if (!err && res.status === 200) {
              this.setState({ workId: res.body.work.id });
            }
          })
      : request.put('/api/v1/works/' + this.state.workId).end((err, res) => {
          if (!err && res.status === 200) {
            this.setState({ workId: '' });
          }
        });
    this.setState({ currentChatMessage: '' });
  }

  componentDidUpdate(prevProps) {
    var prevRoomId =
      typeof prevProps.chatSocket === 'undefined'
        ? 0
        : JSON.parse(prevProps.chatSocket.identifier).room_id;

    var { chatSocket } = this.props;
    var currentRoomId =
      typeof chatSocket === 'undefined'
        ? null
        : JSON.parse(chatSocket.identifier).room_id;

    if (currentRoomId && currentRoomId !== prevRoomId) {
      request
        .get('/api/v1/room_users')
        .query({
          room_id: currentRoomId,
          user_id: this.props.userId,
        })
        .end((err, res) => {
          if (!err && res.status === 200) {
            this.state.users = res.body.users;
          }
        });
    }
  }

  render() {
    var { users } = this.state;
    users = users.map((user) => ({
      id: user.id,
      display: user.name,
    }));
    var startEnd = [
      { id: 0, display: '勤務開始' },
      { id: 1, display: '勤務終了' },
    ];
    return (
      <div className='chat_room'>
        <div className='login_status'>
          <LoginStatus />
        </div>
        <div className='room_lists'>
          <RoomLists />
        </div>
        <div className='chat'>
          <div className='room_name'>
            <p className='partner_name'>{this.props.partnerName}</p>
          </div>
          <div className='chat_logs' id='chatLogs'>
            <ChatLogs />
          </div>
          {(() => {
            if (this.props.chatSocket) {
              return (
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
                    <Mention
                      trigger='@work'
                      data={startEnd}
                      displayTransform={(display) => `${display}`}
                      onAdd={(id) => this.handleWorkingTime(id)}
                    />
                  </MentionsInput>
                  <FontAwesomeIcon
                    icon={faAngleDoubleUp}
                    size='3x'
                    onClick={(e) => this.handleSendEvent(e)}
                    className='btn_send'
                  />
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}

ChatRoom.propTypes = {
  userId: propTypes.number.isRequired,
  chatSocket: propTypes.object,
};

function mapStateToProps(state) {
  return {
    userId: Number(state.user.id),
    chatSocket: state.chat.chatSocket,
  };
}

export default connect(mapStateToProps)(ChatRoom);
