import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiChangeChatRoom } from '../actions/chat';

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
      this.props.chatLogsLists
    );
    this.setState({ changedRoomFlag: true });
  }

  renderRoomLists() {
    const { roomNames, unreadCounts } = this.props;
    return this.props.rooms.map((room, index) => {
      return (
        <li
          onClick={() => this.changeChatRoom(room.id, roomNames[index])}
          className={`room_list_body_item room_${roomNames[index]} ${index}`}
          id={room.id}
          key={`room_id:${room.id}`}
        >
          <div className='item_room'>{roomNames[index]}</div>
          {(() => {
            if (unreadCounts[index] > 0)
              return <span>{unreadCounts[index]}</span>;
          })()}
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
  roomNames: propTypes.array,
  chatSocketLists: propTypes.array,
  chatLogsLists: propTypes.array,
  unreadCounts: propTypes.array,
};

function mapStateToProps(state) {
  return {
    userId: Number(state.user.id),
    rooms: state.user.rooms,
    chatSocket: state.chat.chatSocket,
    roomNames: state.user.roomNames,
    chatSocketLists: state.chat.chatSocketLists,
    chatLogsLists: state.chat.chatLogsLists,
    unreadCounts: state.chat.unreadCounts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    apiChangeChatRoomDispatch(roomId, chatSocketLists, chatLogsLists) {
      dispatch(apiChangeChatRoom(roomId, chatSocketLists, chatLogsLists));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomLists);
