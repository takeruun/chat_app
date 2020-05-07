import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faHome,
  faUser,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../src/actions/user';
import propTypes from 'prop-types';

class Nav extends Component {
  logoutClick() {
    this.props.logoutDispatch(this.props.appearSocket, this.props.history);
  }

  render() {
    return (
      <div className="nav">
        <ul className="list_pages">
          {(() => {
            if (this.props.userId) {
              return (
                <li onClick={() => this.logoutClick()}>
                  <span className="icon">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </span>
                  <p className="explanation">Logout</p>
                </li>
              );
            } else {
              return (
                <li>
                  <Link to="/login">
                    <span className="icon">
                      <FontAwesomeIcon icon={faSignInAlt} />
                    </span>
                  </Link>
                  <p className="explanation">Login</p>
                </li>
              );
            }
          })()}
          <li>
            <Link to="/">
              <span className="icon">
                <FontAwesomeIcon icon={faHome} />
              </span>
            </Link>
            <p className="explanation">Chat</p>
          </li>
          <li>
            <Link to="/user">
              <span className="icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
            </Link>
            <p className="explanation">{this.props.userName}</p>
          </li>
        </ul>
      </div>
    );
  }
}

Nav.propTypes = {
  appearSocket: propTypes.object,
  userId: propTypes.number.isRequired,
  userName: propTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    appearSocket: state.user.appearSocket,
    userId: Number(state.user.id),
    userName: state.user.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutDispatch(userId, history) {
      history.push('login');
      dispatch(logout(userId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
