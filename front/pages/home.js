import Nav from './component/nav';
import TalkRoom from './component/talkroom';
import { Component } from 'react';
import request from 'superagent';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userId: '',
    };
  }

  componentDidMount() {
    this.apiCurrentUser();
  }

  apiCurrentUser() {
    request.get('/api/user').end((err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
      if (res.body.user) {
        this.setState({
          userName: res.body.user.name,
          userId: res.body.user.id,
        });
      }
    });
  }

  render() {
    return (
      <div className="page">
        <Nav userId={this.state.userId} />
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
