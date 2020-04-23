import { Link } from 'react-router-dom';
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

class Nav extends Component {
  logoutClick() {
    this.props.logoutDispatch();
  }

  render() {
    return (
      <nav className="nav">
        <ul>
          <li>
            <Link to="/login">
              <span>
                <FontAwesomeIcon icon={faSignInAlt} />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span>
                <FontAwesomeIcon icon={faHome} />
              </span>
            </Link>
          </li>
          {(() => {
            if (this.props.userId) {
              return (
                <li onClick={() => this.logoutClick()}>
                  <span>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </span>
                </li>
              );
            } else {
              return (
                <li>
                  <Link to="/user">
                    <span>
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </Link>
                </li>
              );
            }
          })()}
        </ul>
        <style jsx>{`
          nav {
            padding: 16px;
            background-color: #262f42;
            width: 80px;
            height: 100vh;
          }
          ul {
            liststyletype: none;
            margin: 0;
            padding: 0;
          }
          li {
            list-style: none;
            display: flex;
            justify-content: center;
            margin-bottom: 40px;
          }
          span {
            width: 40px;
            height: 40px;
            background-color: #ecf0f4;
            border-radius: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          span :hover {
            cursor: pointer;
          }
          svg {
            background-color: #ecf0f4;
          }
        `}</style>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { userId: state.user.result.id };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutDispatch() {
      dispatch(logout());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
