import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class ChatLogs extends Component {
  componentDidUpdate() {
    if (this.props.chatLogs.length > 0) {
      this.toBottom();
    }
  }

  toBottom() {
    var elem = document.getElementById('chatLogs');
    elem.scroll(0, elem.scrollHeight);
  }

  renderChatLogs() {
    return this.props.chatLogs.map((el) => {
      return (
        <li key={`chat_${el.id}`} className='chat_log_body_item'>
          {(() => {
            if (el.user_id === this.props.userId) {
              return (
                <div className='my_chat_box'>
                  <img
                    className='my_image'
                    src='/images/a.jpg'
                    alt={`user_id:${el.user_id}の画像`}
                  />
                  <div className='my_chat'>
                    <p className='my_chat_message'>{el.body}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div className='partner_chat_box'>
                  <img
                    className='partner_image'
                    src='/images/a.jpg'
                    alt={`user_id:${el.user_id}の画像`}
                  />
                  <div className='partner_chat'>
                    <p className='partner_chat_message'>{el.body}</p>
                  </div>
                </div>
              );
            }
          })()}
        </li>
      );
    });
  }

  render() {
    return (
      <div className='chat_logs_body'>
        {(() => {
          if (this.props.chatLogs) return <ul>{this.renderChatLogs()}</ul>;
        })()}
      </div>
    );
  }
}

ChatLogs.propTypes = {
  userId: propTypes.number.isRequired,
  chatLogs: propTypes.array,
};

function mapStateToProps(state) {
  return {
    userId: Number(state.user.id),
    chatLogs: state.chat.chatLogs,
  };
}
export default connect(mapStateToProps, null)(ChatLogs);
