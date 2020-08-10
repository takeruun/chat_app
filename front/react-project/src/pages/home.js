import React from 'react';
import Nav from '../components/nav';
import { Component } from 'react';
import { connect } from 'react-redux';
import { apiGetCurrentUser } from '../actions/user';

class Home extends Component {
  componentDidMount() {
    this.props.apiGetCurrentUserDispatch();
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

//Action Createrの呼び出し　actionのapiGetCurrentUser method
function mapDispatchToProps(dispatch) {
  return {
    apiGetCurrentUserDispatch() {
      dispatch(apiGetCurrentUser());
    },
  };
}

export default connect(null, mapDispatchToProps)(Home);
