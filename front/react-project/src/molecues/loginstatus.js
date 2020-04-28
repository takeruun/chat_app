import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers } from '../../src/actions/user';

class LoginStatus extends Component {
  componentDidMount() {
    this.props.getUsersDispatch();
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

  render() {
    return this.props.users.map((user, index) => {
      return (
        <li className="loginStatusBodyItem" key={`user_${user.id}`}>
          <div className="loginStatusBodyItemImage">
            <img
              src="/images/blue.jpg"
              onClick={(e) => this.props.changeTalkRoomDispatch(user.id)}
            />
          </div>
          <div className="loginStatusBodyItemName">{user.name}</div>
          <div className="loginStatusBodyItemStaus">
            <span id={`loginUser_${user.id}`}></span>
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

LoginStatus.propTypes = {
  userId: propTypes.number.isRequired,
  users: propTypes.object.isRequired,
  appearUsers: propTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    users: state.user.users,
    appearUsers: state.user.appearUsers,
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
