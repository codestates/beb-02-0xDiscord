import React from "react"
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../static/community.css"
import { Icon } from '@iconify/react';

class Community extends React.Component {

  state = {
      recentTopic: []
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/v.0.1/board/recent/topic/20")
      .then(res => {
        const resData = res.data;
        console.log(resData);
        this.setState({recentTopic: resData});
      });
  }


  
  render() {
    const token = window.localStorage.getItem("token");
    console.log(token);
    return (
      <div className="community-main main-index">
        <div className="community-write-button-main">
          <div className="community-write-button-box">
            <Icon icon="jam:write" color="#868cff" height="3.5vh"/>
            <div className="community-write-button-text">
      {token ? <Link to="/write"> write </Link> : <div onClick={() => this.props.login_eth()}> write </div>}
            </div>
          </div>
        </div>
        
        <div>
          Community
        </div>
        <div className="community-content-main">
          <div className="main-footer-recent-conent-header">
            <div className="main-footer-recent-content-header-author">
              Author
            </div>
            <div className="main-footer-recent-content-header-title">
              Title
            </div>
            <div className="main-footer-recent-content-header-up">
              UP
            </div>
          </div>

          <ul className="main-footer-recent-content" >
          {
            this.state.recentTopic.map(
              recentTopic => 
              <li key={recentTopic.id} className="main-footer-recent-content-div">
                <div className="main-footer-recent-div-address">
                  {recentTopic.etherAddress.slice(0, 5)+"..."}
                </div>
                <div className="main-footer-recent-div-title">
                  <Link to={`/board/view/${recentTopic.id}`}>{recentTopic.title}</Link>
                </div>
                <div className="main-footer-recent-div-up">
                  {recentTopic.up}
                </div>
              </li>
            )
          }
          </ul>
        </div>
      </div>
    )
  }
  

}

export default Community;
