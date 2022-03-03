import React from 'react';
import axios from 'axios';
import Countdown from 'react-countdown';



class TimeToken extends React.Component {
  state = {
      timeToken: [],
      end: []
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/v0.1/time")
      .then(res => {
        const resData = res.data;
        const a = resData[0];
        const end = a["rewardEndTime"]; 
        this.setState({end: Math.floor(end*1000)})


        this.setState({timeToken: resData});
      });

  }

  render() {
    return (
      <div className="main-statistic-middle-hottopic-content" >
      {
        this.state.timeToken.map(
            timeToken => 
            <div className="main-statistic-middle-hottopic-content-div" key={timeToken}>
              Countdown: <Countdown date={this.state.end}/>
            </div>
          )
      }
      </div>
    )
  }
}
  

export default TimeToken;
