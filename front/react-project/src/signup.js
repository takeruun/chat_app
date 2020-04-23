import React from 'react';
import SignUpForm from './molecues/signupform';

const SignUp = () => (
  <div className="page">
    <div className="imageArea">
      <img src="/images/blue.jpg" />
      <p>アカウント作ってく？？</p>
    </div>
    <div className="signUpArea">
      <h1>新規アカウント作成</h1>
      <SignUpForm />
    </div>
    <style jsx>{`
      .page {
        width: 100%;
        height: 100vh;
        display: flex;
      }
      .imageArea {
        position: relative;
        width: 70%;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      p {
        position: absolute;
        top: 20%;
        left: 20%;
        color: #fff;
        font-weight: bold;
        font-size: 4vw;
      }
      .signUpArea {
        background-color: #262f42;
        color: #fff;
        padding: 30px;
        width: 30%;
      }
    `}</style>
  </div>
);

export default SignUp;
