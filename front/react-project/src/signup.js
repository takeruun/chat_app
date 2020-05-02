import React from 'react';
import SignUpForm from './molecues/signupform';
import './style/signup.scss';

const SignUp = () => (
  <div className="signup_page">
    <div className="background">
      <img src="/images/blue.jpg" alt="背景" />
      <p className="comment">アカウント作ってく？？</p>
    </div>
    <div className="signup_area">
      <h1 className="msg">新規アカウント作成</h1>
      <SignUpForm />
    </div>
  </div>
);

export default SignUp;
