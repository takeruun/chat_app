import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSocketChat } from '../actions/chat';

class RoomLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeChatRoomFlag: false,
    };
    this.changeChatRoom = this.changeChatRoom.bind(this);
  }

  componentDidMount() {}

  changeChatRoom(roomId) {
    if (this.state.changedRoom) this.props.chatSocket.disconnected();
    this.props.changeChatRoomDispatch(roomId);
    this.setState({ changedRoomFlag: true });
  }

  renderRoomLists() {
    return this.props.rooms.map((room) => {
      return (
        <li
          onClick={() => this.changeChatRoom(room.id)}
          key={`room_id:${room.id}`}
        >
          <div>
            {room.id} : {room.name}
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className='room_list'>
        <div className='header'>
          <p>ルームリスト</p>
        </div>
        {this.renderRoomLists()}
      </div>
    );
  }
}

RoomLists.propTypes = {
  userId: propTypes.number.isRequired,
  rooms: propTypes.array.isRequired,
  chatSocket: propTypes.object,
};

function mapStateToProps(state) {
  return {
    userId: Number(state.user.id),
    rooms: state.user.rooms,
    chatSocket: state.chat.chatSocket,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeChatRoomDispatch(roomId) {
      dispatch(createSocketChat(roomId, []));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomLists);
