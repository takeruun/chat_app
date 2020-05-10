import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class User extends Component {
  render() {
    return (
      <div className="user_page">
        <h1 className="title">{this.props.userName}</h1>
      </div>
    );
  }
}

User.propTypes = {
  userName: propTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    userName: state.user.name,
  };
}

export default connect(mapStateToProps)(User);
