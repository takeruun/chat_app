import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiGetUsers } from '../actions/user';
import { apiCreateRoom } from '../actions/chat';

class LoginStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeChatRoomFlag: false,
    };
    this.createChatRoom = this.createChatRoom.bind(this);
  }

  componentDidMount() {
    this.props.apiGetUsersDispatch();
  }

  componentDidUpdate() {
    if (this.props.appearUsers && this.props.users) {
      const data = this.props.appearUsers;
      for (var i = 0; i < data.length; i++) {
        var element = document.getElementById(`loginUser_${data[i].id}`);
        if (data[i].is_login === true) {
          if (this.props.userId === data[i].id) {
            element.style.backgroundColor = 'red';
          } else {
            element.style.backgroundColor = 'green';
          }
        } else {
          element.style.backgroundColor = 'white';
        }
      }
    }
  }

  createChatRoom(partnerId) {
    this.props.apiCreateChatRoomDispatch(
      [this.props.userId, partnerId],
      this.props.rooms,
      this.props.roomNames
    );
  }

  renderLoginUsers() {
    return this.props.users.map((user, index) => {
      return (
        <li className='login_status_body_item' key={`user_${user.id}`}>
          <div className='item_user_image'>
            <img
              src='/images/blue.jpg'
              alt={`user_id:${user.id}の画像`}
              onClick={() => this.createChatRoom(user.id)}
            />
          </div>
          <div className='item_user_name'>{user.name}</div>
          <div className='item_user_status'>
            <span className='user_status' id={`loginUser_${user.id}`}></span>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className='header'>
          <p>ログイン状況</p>
        </div>
        <div className='login_status_body'>
          {(() => {
            if (this.props.users) return <ul>{this.renderLoginUsers()}</ul>;
          })()}
        </div>
      </React.Fragment>
    );
  }
}

LoginStatus.propTypes = {
  userId: propTypes.number.isRequired,
  users: propTypes.array.isRequired,
  appearUsers: propTypes.array,
  rooms: propTypes.array,
  roomNames: propTypes.array,
};

function mapStateToProps(state) {
  return {
    userId: Number(state.user.id),
    users: state.user.users,
    appearUsers: state.user.appearUsers,
    rooms: state.user.rooms,
    roomNames: state.user.roomNames,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    apiGetUsersDispatch() {
      dispatch(apiGetUsers());
    },
    apiCreateChatRoomDispatch(user_ids, rooms, roomNames) {
      dispatch(apiCreateRoom(user_ids, rooms, roomNames));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginStatus);
