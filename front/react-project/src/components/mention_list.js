import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class MentionList extends Component {
  constructor(porps) {
    super(porps);
    this.threads = this.threads.bind(this);
  }

  threads() {
    return this.props.threads.map((thread) => {
      return <div>{thread.content}</div>;
    });
  }

  render() {
    return (
      <div className='thread'>
        <div>{this.threads()}</div>
      </div>
    );
  }
}

MentionList.propTypes = {
  userId: propTypes.number,
  threads: propTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  console.log(state.mention.mentionList);
  return {
    userId: Number(state.user.id),
    threads: state.mention.mentionList,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MentionList);
