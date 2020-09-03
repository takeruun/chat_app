import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiChangeChatRoom } from '../actions/chat';
import { withRouter } from 'react-router-dom';

class RoomLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeChatRoomFlag: false,
    };
    this.changeChatRoom = this.changeChatRoom.bind(this);
  }

  componentDidMount() {}

  currentRoom(name) {
    var oldElement = document.getElementsByClassName('current_room');
    if (oldElement.length !== 0) oldElement[0].classList.remove('current_room');
    var element = document.getElementsByClassName(`room_${name}`);
    element[0].classList.add('current_room');
  }

  changeChatRoom(roomId, roomName) {
    this.currentRoom(roomName);
    this.props.apiChangeChatRoomDispatch(
      roomId,
      this.props.chatSocketLists,
      this.props.userId
    );
    this.setState({ changedRoomFlag: true });
    //this.props.history.push('/chat/' + roomId);
  }

  renderRoomLists() {
    const { roomNames, unreadCounts } = this.props;
    return this.props.rooms.map((room, index) => {
      const key = `room_${room.id}`;
      return (
        <li
          onClick={() => this.changeChatRoom(room.id, roomNames[key])}
          className={`room_list_body_item room_${roomNames[key]} ${index}`}
          id={room.id}
          key={`room_id:${room.id}`}
        >
          <div className='item_room'>
            <p className='room_name'>{roomNames[key]}</p>
            {(() => {
              if (unreadCounts[key] > 0)
                return (
                  <span className='unread_count'>{unreadCounts[key]}</span>
                );
            })()}
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className='header'>
          <p>ルームリスト</p>
        </div>
        <div className='room_lists_body'>
          {(() => {
            if (this.props.rooms) return <ul>{this.renderRoomLists()}</ul>;
          })()}
        </div>
      </React.Fragment>
    );
  }
}

RoomLists.propTypes = {
  userId: propTypes.number.isRequired,
  rooms: propTypes.array.isRequired,
  chatSocket: propTypes.object,
  roomNames: propTypes.object,
  chatSocketLists: propTypes.array,
  unreadCounts: propTypes.object,
};

function mapStateToProps(state) {
  return {
    userId: Number(state.user.id),
    rooms: state.user.rooms,
    chatSocket: state.chat.chatSocket,
    roomNames: state.user.roomNames,
    chatSocketLists: state.chat.chatSocketLists,
    unreadCounts: state.chat.unreadCounts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    apiChangeChatRoomDispatch(roomId, chatSocketLists, userId) {
      dispatch(apiChangeChatRoom(roomId, chatSocketLists, userId));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RoomLists));
