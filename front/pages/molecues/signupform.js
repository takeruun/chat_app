import { Component } from "react";
import Router from "next/router";
import request from "superagent";

export default class SignUpForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      username: ''
    }
  }

  apiSignUpUser(){
    request
      .post('api/users')
      .send({
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
      .end((err, res) => {
        if (err){
          console.log(err);
        }
        console.log(res)
        if(res.body.token) {
          localStorage.setItem('token', res.body.token);
          let token = localStorage.getItem('token');
          console.log(token);
          Router.push('/');
        }
        else{
          alert(res.body.text);
          
        }

      })
  }

  render(){
    const changed = (name, e) => this.setState({[name]: e.target.value})
    return(
      <div>
        <div className="form">
          <span>メールアドレス</span>
            <input type="email" value={this.state.email}
                onChange={e => changed('email', e)} /><br />
            <span>パスワード</span>
            <input type='password' value={this.state.password}
                onChange={e => changed('password' , e)} /><br />
            <span>ユーザーネーム</span>
            <input value={this.state.username}
                onChange={e => changed('username' , e)} /><br />
            <button onClick={e　=> this.apiSignUpUser()}>登録</button><br />
            <p>{this.state.msg}</p>
          </div>
          <style jsx>{`
            span {
              display: block;
            }
            input {
              width: 100%;
              height: 32px;
              margin-bottom: 40px;
            }
            button {
              display: block;
              width: 60px;
              height: 32px;
              margin-left: auto;
            }
          `}</style>
      </div>
    )
  }
}