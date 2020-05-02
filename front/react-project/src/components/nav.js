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
        <ul>
          {(() => {
            if (this.props.userId) {
              return (
                <li onClick={() => this.logoutClick()}>
                  <span className="icon">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </span>
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
          </li>
          <li>
            <Link to="/user">
              <span className="icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

Nav.propTypes = {
  appearSocket: propTypes.object,
  userId: propTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    appearSocket: state.user.appearSocket,
    userId: Number(state.user.id),
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
