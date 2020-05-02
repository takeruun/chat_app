import React from 'react';
import LogInForm from './molecues/loginform';
import './style/login.scss';

const Login = () => {
  return (
    <div className="login_page">
      <div className="background">
        <img src="/images/blue.jpg" alt="背景" />
        <p className="comment">チャットしていく？</p>
      </div>
      <div className="login_area">
        <h1 className="msg">ログイン</h1>
        <LogInForm />
      </div>
    </div>
  );
};

export default Login;
