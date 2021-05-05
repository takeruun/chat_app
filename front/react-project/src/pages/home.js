import React from 'react';
import Nav from '../components/nav';
import propTypes from 'prop-types';
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

Home.propTypes = {
  chatSocketLists: propTypes.array,
};

function mapStateToProps(state) {
  return {
    chatSocketLists: state.chat.chatSocketLists,
  };
}

//Action Createrの呼び出し　actionのapiGetCurrentUser method
function mapDispatchToProps(dispatch) {
  return {
    apiGetCurrentUserDispatch() {
      dispatch(apiGetCurrentUser());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
