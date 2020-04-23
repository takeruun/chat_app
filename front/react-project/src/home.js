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
      <React.Fragment>
        <div className="page">
          <Nav />
          <TalkRoom />
          <style jsx>{`
            .page {
              display: flex;
            }
          `}</style>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUserDispatch() {
      dispatch(getCurrentUser());
    }, //Action Createrの呼び出し　actionのgetCurrentUser method
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
