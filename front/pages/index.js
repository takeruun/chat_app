import Nav from "./component/nav"
import TalkRoom from "./component/talkroom"

const Index = () => (
  <div className="page">
    <Nav />
    <TalkRoom />
    <style jsx>{`
      .page {
        display: flex;
      }
    `}</style>
  </div>
)

export default Index