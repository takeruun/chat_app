import { Component } from "react";
import request from "superagent";
import Router from "next/router";

export default class  LogInForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  apiSignInUser(){
    request
      .get('/api/login')
      .query({
          email: this.state.email,
          password: this.state.password
          })
      .end((err, res) => {
        if(err){
          console.log(err);
        }
        console.log(res)
        if(res.body.user){
          Router.push('/');
        }
        else{
          console.log(res.body.text);
          alert(res.body.text)
          this.setState({email: '', password: ''})
        }
      })
  }

  render(){
    const changed = (name, e) => this.setState({[name]: e.target.value})
    return(
      <div>
        <div>
          <span>メールアドレス</span>
          <input value={this.state.email}
              onChange={e => changed('email', e)} /><br />
          <span>パスワード</span>
          <input type='password' value={this.state.password}
              onChange={e => changed('password' , e)} /><br />
          <button onClick={e　=> this.apiSignInUser()}>ログイン</button><br />
        </div>
        <style jsx>{`
          span {
            display: block;
          }
          input {
            padding-left: 10px;
            width: 100%;
            height: 32px;
            margin-bottom: 40px;
            font-size: 15px;
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