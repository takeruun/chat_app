import Nav from "./component/nav"
import TalkRoom from "./component/talkroom"
import { Component } from "react"
import request from "superagent"

export default class Index extends Component{
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      userId: ''
    }
  }

  componentDidMount(){
    this.apiCurrentUser();
  }

  apiCurrentUser(){
    request
      .get('/api/user')
      .withCredentials()
      .end((err, res)=> {
        if(err){
          console.log(err);
        }
        console.log(res);
        if(res.body.user){
          this.setState({
            userName: res.body.user.name,
            userId: res.body.user.id
          });
        }
      })
  }

  render(){
    return(
      <div className="page">
        <Nav userId={this.state.userId}/>
        <TalkRoom userName={this.state.userName} userId={this.state.userId}/>
        <style jsx>{`
          .page {
            display: flex;
          }
        `}</style>
      </div>
    )
  }
}