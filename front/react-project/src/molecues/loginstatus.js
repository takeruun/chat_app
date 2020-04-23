import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../src/actions/user';

class LoginStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstSocket: true,
    };
  }
  componentDidMount() {
    this.props.getUsersDispatch();
  }

  componentDidUpdate() {
    if (this.props.userId && this.props.users && this.state.firstSocket) {
      this.createSocketAppear();
      this.setState({ firstSocket: false });
    }
  }

  createSocketAppear() {
    var Cable = require('actioncable');
    let appearcable = Cable.createConsumer('wss:localhost/api/cable');
    this.appear = appearcable.subscriptions.create(
      {
        channel: 'AppearanceChannel',
        user_id: this.props.userId,
      },
      {
        connected: () => {},
        received: (data) => {
          for (var i = 0; i < data.user.length; i++) {
            if (data.user[i].is_login == true) {
              var element = document.getElementById(
                `loginUser_${data.user[i].id - 1}`
              );
              if (this.props.userId == data.user[i].id)
                element.style.backgroundColor = 'red';
              else element.style.backgroundColor = 'green';
            } else {
              var element = document.getElementById(
                `loginUser_${data.user[i].id - 1}`
              );
              element.style.backgroundColor = 'white';
            }
          }
        },
      }
    );
  }

  render() {
    return this.props.users.map((user, index) => {
      return (
        <li className="loginStatusBodyItem" key={`user_${index}`}>
          <div className="loginStatusBodyItemImage">
            <img
              src="/images/blue.jpg"
              onClick={(e) => this.props.changeTalkRoomDispatch(user.id)}
            />
          </div>
          <div className="loginStatusBodyItemName">{user.name}</div>
          <div className="loginStatusBodyItemStaus">
            <span id={`loginUser_${index}`}></span>
          </div>
          <style>{`
          .loginStatusBodyItem {
            display: flex;
            margin-bottom: 20px;
          }
          .loginStatusBodyItemImage {
            width: 40px;
            height: 40px;
            padding-right: 10px;
          }
          .loginStatusBodyItemImage :hover {
            cursor: pointer;
          }
          .loginStatusBodyItemImage img {
            width: 100%;
            height: 100%;
            obect-fit: cover;
            border-radius: 100px;
          }
          .loginStatusBodyItemName {
            display: flex;
            align-items: center;
            width: 170px;
          }
          .loginStatusBodyItemStaus {
            width: 20px;
            display: flex;
            align-items: center;
          }
          .loginStatusBodyItemStaus span{
            display: block;
            border: 1px solid #ccc;
            width: 10px;
            height: 10px;
            border-radius: 10px;
          }
          `}</style>
        </li>
      );
    });
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.result.id,
    users: state.user.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsersDispatch() {
      dispatch(getUsers());
    },
    /*
    changeTalkRoomDispatch(user_id) {
      dispatch(changeTalkRoom(user_id));
    },*/
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginStatus);
