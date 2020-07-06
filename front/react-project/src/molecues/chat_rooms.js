import React, { Component } from 'react';
import request from 'superagent';

class ChatRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };
  }

  componentDidMount() {
    request
      .get('api/rooms')
      .query({ current_user_id: this.props.userId })
      .end((err, res) => {
        if (!err && res.body.rooms) {
          this.setState({ rooms: res.body.rooms });
        }
      });
  }

  renderRoomList() {
    return this.props.rooms.map((room, index) => {
      return (
        <li>
          {room.id}
          <div>{room.user_id}</div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className='room_list'>
        {(() => {
          if (this.props.rooms) {
            this.renderRoomList();
          } else {
            return (
              <div className='header'>
                <p>ルームリスト</p>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}

export default ChatRooms;
