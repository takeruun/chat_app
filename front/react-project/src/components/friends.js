import React, { Component } from 'react';
import propTypes from 'prop-types';
import '../style/index.scss';
import { connect } from 'react-redux';
import { getUsers, getUser } from '../actions/user';
import { Link, withRouter } from 'react-router-dom';

class Friends extends Component {
  componentDidMount() {
    this.props.getUsersDispatch();
  }

  renderFriends() {
    return this.props.friends.map((user, index) => {
      return (
        <li className="friend" key={index}>
          <div className="left">
            <img
              className="image"
              src="/images/a.jpg"
              alt={`friend_${index}の画像`}
            />
          </div>
          <div className="right">
            <div className="name">{user.name}</div>
            <div className="email">{user.email}</div>
            {(() => {
              if (user.is_login === true) {
                return <div className="login_status">ログイン中</div>;
              } else {
                return <div className="login_status">ログアウト中</div>;
              }
            })()}
            <Link
              to={'/users/' + user.id}
              onClick={this.props.getUserDispatch(user.id)}
            >
              こちら
            </Link>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="friends_page">
        <h1 className="title">友だち一覧</h1>
        <div className="friends">{this.renderFriends()}</div>
      </div>
    );
  }
}

Friends.propTypes = {
  friends: propTypes.array.isRequired,
};

function matStateToProps(state) {
  return {
    friends: state.user.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserDispatch(id) {
      dispatch(getUser(id));
    },
    getUsersDispatch() {
      dispatch(getUsers());
    },
  };
}

export default connect(
  matStateToProps,
  mapDispatchToProps
)(withRouter(Friends));
