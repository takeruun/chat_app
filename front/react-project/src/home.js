import React from 'react';
import Nav from './components/nav';
import ChatRoom from './components/chatroom';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from './actions/user';

class Home extends Component {
  componentDidMount() {
    this.props.getCurrentUserDispatch();
  }

  render() {
    return (
      <div className="home">
        <Nav />
        <ChatRoom />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userId: state.user.id };
}

//Action Createrの呼び出し　actionのgetCurrentUser method
function mapDispatchToProps(dispatch) {
  return {
    getCurrentUserDispatch() {
      dispatch(getCurrentUser());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
