import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faHome, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import React, {Component} from 'react'
import Router from 'next/router'
import request from 'superagent';
export default class Nav extends Component {
    constructor (props) {
      super(props)
      this.state = { 
        user_id: ''
      }
    }

    componentDidMount(){
    this.apiCurrentUser();
  }

  apiCurrentUser(){
    request
      .get('/api/users')
      .withCredentials()
      .end((err, res)=> {
        if(err){
          console.log(err);
        }
        console.log(res);
        if(res.body.user){
          this.setState({user_id: res.body.user.id});
        }
      })
  }
    
    logout() {
      request
        .post('/api/logout')
        .end((err, res) => {
          if(err){
            console.log(err);
          }
          console.log(res.body.text);
        })
    }

    render () {
      const auth = this.state.auth
      return (
      <nav className='nav'>
        <ul>
          <li>
            <Link href="/login">
              <span><FontAwesomeIcon icon={ faSignInAlt } /></span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span><FontAwesomeIcon icon={ faHome } /></span>
            </Link>
          </li>
          {(()=> {
            if (this.state.user_id){
              return(
              <li onClick={e　=> this.logout()}>
                <span><FontAwesomeIcon icon={ faSignOutAlt } /></span>
              </li>
              )
            }
            else{
              return(
              <li>
                <Link href="/user">
                  <span><FontAwesomeIcon icon={ faUser } /></span>
                </Link>
              </li>
              )
            }
          })()}
        </ul>
          <style jsx>{`
            nav {
              padding: 16px;
              background-color: #262F42;
              width: 64px;
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
              background-color: #ECF0F4;
              border-radius: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            span :hover{
              cursor: pointer;
            }
            svg {
              background-color: #ECF0F4;
            }
          `}</style>
        </nav>
      )
  }
}