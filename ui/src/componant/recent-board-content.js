import React from 'react';
import axios from 'axios';


class RecentTopic extends React.Component {
  state = {
      recentTopic: []
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/v.0.1/board/recent/topic")
      .then(res => {
        const resData = res.data;
        console.log(resData);
        this.setState({recentTopic: resData});
      });
  }

  render() {
    return (
      <ul className="main-footer-recent-content" >
      {
        this.state.recentTopic.map(
          recentTopic => 
          <li key={recentTopic.id} className="main-footer-recent-content-div">
            <div className="main-footer-recent-div-address">
              {recentTopic.etherAddress}
            </div>
            <div className="main-footer-recent-div-title">
              {recentTopic.title}
            </div>
            <div className="main-footer-recent-div-up">
              {recentTopic.up}
            </div>
          </li>
        )
      }
      </ul>
    )
  }
  
}

export default RecentTopic;
