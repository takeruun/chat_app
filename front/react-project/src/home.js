import React from 'react';
import Nav from './components/nav';
import TalkRoom from './components/talkroom';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from './actions/user';

class Home extends Component {
  render() {
    return (
      <div className="page">
        <Nav />
        <TalkRoom />
        <style jsx>{`
          .page {
            display: flex;
          }
        `}</style>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

//Action Createrの呼び出し　actionのgetCurrentUser method
const mapDispatchToProps = { getCurrentUser };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
