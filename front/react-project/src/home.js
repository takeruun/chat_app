import React from 'react';
import Nav from './components/nav';
import TalkRoom from './components/talkroom';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from './actions/user';

class Home extends Component {
  componentDidMount() {
    this.props.getCurrentUserDispatch();
  }

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
  console.log(state);
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
