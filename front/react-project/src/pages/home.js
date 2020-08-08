import React from 'react';
import Nav from '../components/nav';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/user';

class Home extends Component {
  componentDidMount() {
    this.props.getCurrentUserDispatch();
  }

  render() {
    const Component = this.props.component;
    return (
      <div className='home'>
        <Nav />
        <Component />
      </div>
    );
  }
}

//Action Createrの呼び出し　actionのgetCurrentUser method
function mapDispatchToProps(dispatch) {
  return {
    getCurrentUserDispatch() {
      dispatch(getCurrentUser());
    },
  };
}

export default connect(null, mapDispatchToProps)(Home);
