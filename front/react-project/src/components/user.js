import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
    );
  }
}

User.propTypes = {
  user: propTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user.user,
  };
}

export default connect(mapStateToProps)(User);
