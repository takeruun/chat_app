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
          className='room_list_body_item'
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
