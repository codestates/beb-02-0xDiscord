import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



class HotTopic extends React.Component {
  state = {
      hotTopic: []
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/v.0.1/board/hot_topic")
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
            <div>
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
