import React from 'react';
import SignUpForm from './molecues/signup_form';
import './style/signup.scss';

const SignUp = () => (
  <div className='signup_page'>
    <div className='background'>
      <p className='comment'>アカウント作ってく？？</p>
    </div>
    <div className='signup_area'>
      <h1 className='msg'>新規アカウント作成</h1>
      <SignUpForm />
    </div>
  </div>
);

export default SignUp;
