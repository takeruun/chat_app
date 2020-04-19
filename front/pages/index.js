import Nav from './component/nav';
import TalkRoom from './component/talkroom';
import { Component } from 'react';
import request from 'superagent';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../src/reducers';

const store = createStore(reducer);
export default class Index extends Component {
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
        <Provider store={store}>
          <Nav userId={this.state.userId} />
          <TalkRoom />
        </Provider>
        <style jsx>{`
          .page {
            display: flex;
          }
        `}</style>
      </div>
    );
  }
}
