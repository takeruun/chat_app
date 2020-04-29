import React from 'react';
import LogInForm from './molecues/loginform';

const Login = () => {
  return (
    <div className="page">
      <div className="ImageArea">
        <img src="/images/blue.jpg" alt="背景" />
        <p>チャットしていく？</p>
      </div>
      <div className="SignInArea">
        <h1>ログイン</h1>
        <LogInForm />
      </div>
      <style jsx>{`
        .page {
          width: 100%;
          height: 100vh;
          display: flex;
        }
        .ImageArea {
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
        .SignInArea {
          background-color: #262f42;
          color: #fff;
          padding: 30px;
          width: 30%;
        }
      `}</style>
    </div>
  );
};

export default Login;
