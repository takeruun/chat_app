import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faHome,
  faUser,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import request from 'superagent';
export default class Nav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  logout() {
    request.post('/api/logout').end((err, res) => {
      if (err) {
        console.log(err);
      }
      if (res.body) {
        console.log(res.body.text);
        window.location.reload();
      }
    });
  }

  render() {
    return (
      <nav className="nav">
        <ul>
          <li>
            <Link href="/login">
              <span>
                <FontAwesomeIcon icon={faSignInAlt} />
              </span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span>
                <FontAwesomeIcon icon={faHome} />
              </span>
            </Link>
          </li>
          {(() => {
            if (this.props.userId) {
              return (
                <li onClick={(e) => this.logout()}>
                  <span>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </span>
                </li>
              );
            } else {
              return (
                <li>
                  <Link href="/user">
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
