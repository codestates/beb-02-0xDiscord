import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config/config.json'


class HotTopic extends React.Component {
  state = {
      hotTopic: []
  }

  componentDidMount() {
    axios.get(config["API_SERVER_TOPIC_HOT"])
      .then(res => {
        const resData = res.data;
        this.setState({hotTopic: resData});
        console.log(resData);
      });
  }
  render() {
    return (
      <div className="main-statistic-middle-hottopic-content" >
      {
        this.state.hotTopic.map(
            hotTopic => 
            <div className="main-statistic-middle-hottopic-content-div" key={hotTopic.id}>
                <div>
                  <Link to={`/board/view/${hotTopic.id}`}>{hotTopic.title}</Link>
                </div>
                <div>
                  {hotTopic.up}
                </div>
            </div>
          )
      }
      </div>
    )
  }
}
  

export default HotTopic;
