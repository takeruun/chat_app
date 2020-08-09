import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeChatRoom } from '../actions/chat';

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
    var element = document.getElementById(`room_${name}`);
    element.classList.add('current_room');
  }

  changeChatRoom(roomId, roomName) {
    this.currentRoom(roomName);
    //if (this.state.changedRoom) this.props.chatSocket.disconnected();
    this.props.changeChatRoomDispatch(roomId, this.props.chatSocketLists);
    this.setState({ changedRoomFlag: true });
  }

  renderRoomLists() {
    const { roomNames } = this.props;
    return this.props.rooms.map((room, index) => {
      return (
        <li
          onClick={() => this.changeChatRoom(room.id, roomNames[index])}
          className={`room_list_body_item room_${roomNames[index]} ${room.id}`}
          id={`room_${roomNames[index]}`}
          key={`room_id:${room.id}`}
        >
          <div className='item_room'>{roomNames[index]}</div>
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
};

function mapStateToProps(state) {
  return {
    userId: Number(state.user.id),
    rooms: state.user.rooms,
    chatSocket: state.chat.chatSocket,
    roomNames: state.user.roomNames,
    chatSocketLists: state.chat.chatSocketLists,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeChatRoomDispatch(roomId, chatSocketLists) {
      dispatch(changeChatRoom(roomId, chatSocketLists));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomLists);
