import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChatLogs extends Component {
  componentDidUpdate() {
    console.log(this.props.chatLogs);
    if (this.props.chatLogs.length > 0) {
      this.toBottom();
    }
  }

  toBottom() {
    var elem = document.getElementById('chatLogs');
    elem.scroll(0, elem.scrollHeight);
    return elem.scrollHeight;
  }

  render() {
    return this.props.chatLogs.map((el) => {
      return (
        <li key={`chat_${el.id}`}>
          {(() => {
            if (el.user_id === this.props.userId) {
              return (
                <div className="chatBox">
                  <img
                    className="meImage"
                    src="/images/a.jpg"
                    alt={`user_id:${el.user_id}の画像`}
                  />
                  <p className="meChatMessage">{el.body}</p>
                </div>
              );
            } else {
              return (
                <div className="chatBox">
                  <img
                    className="partnerImage"
                    src="/images/a.jpg"
                    alt={`user_id:${el.user_id}の画像`}
                  />
                  <p className="partnerChatMessage">{el.body}</p>
                </div>
              );
            }
          })()}
          <style>{`
            li {
              list-style: none;
            }
            p {
              padding: 0px;
              margin: 0px;
            }
            .chatBox {
              margin: auto;
              width: 760px;
            }
            .meImage {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              float: left;
            }
            .partnerImage {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              float: right;
            }
            .meChatMessage {
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
            .partnerChatMessage {
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
}

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    chatLogs: state.chat.chatLogs,
  };
}
export default connect(mapStateToProps, null)(ChatLogs);
