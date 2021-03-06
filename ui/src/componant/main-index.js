import '../static/main-index.css'
import { Icon } from '@iconify/react';
import Trend from 'react-trend';
import HotTopic from './hot-topic.js'
import RecentTopic from './recent-board-content.js'

function MainIndex({acc, siteToken, todaySite, newClient}) {
  
  const MyComponent = () => <Trend data={[0, 10, 5, 22, 3.6, 11]} />;
 
  
  var dataNew = [1,2,3,4,10]
  var dataToday = [1,2,3,10,1,5,3]


  const ActityTrend = () => (
    <Trend
      smooth
      autoDraw
      autoDrawDuration={3000}
      autoDrawEasing="ease-out"
      data={[10,2,5,2,5,2,1,1,2,4]}
      gradient={['white', '#868CFF']}
      radius={4.8}
      strokeWidth={4.1}
      strokeLinecap={'butt'}
      width={50}
    />
  );

  const token = 321; 

  return (
    <div className="main-index">
      <div className="main-header">
          <div>
            Hello!
          </div>
          <div>
            {acc}
          </div>
      </div>
      <div className="main-statistic-header">
        <div className="main-statistic-token">
          <div className="main-statistic-token-symbol">
            <Icon icon="dashicons:money-alt" color="white" width="3.6vh"/>
          </div>
          <div>
            <div className="main-statistic-title">
              Your Token
            </div>
            <div>
              {siteToken ?  siteToken.slice(0, 4) + "..." : null }
            </div>
          </div>
          <div>

          <Trend
            smooth
            autoDraw
            autoDrawDuration={3000}
            autoDrawEasing="ease-out"
            data={dataToday}
            gradient={['#4318FF', '#fff']}
            radius={4.8}
            strokeWidth={4.1}
            strokeLinecap={'butt'}
            width={50}
          />
          </div>
        </div>
        <div className="main-statistic-activity">
          <div>
            <div className="main-statistic-activity-title">
              Today Activity
            </div>
            <div className="main-statistic-activity-num">
              ${token}
            </div>
          </div>
          <div>
            <ActityTrend/>
          </div>
        </div>
        <div className="main-statistic-token">
          <div className="main-statistic-token-symbol">
            <Icon icon="fluent:people-28-filled" color="white" height="3.6vh" />
          </div>
          <div>
            <div className="main-statistic-title">
              New Clients
            </div>
            <div>
              {newClient}
            </div>
          </div>
          <div>
          <Trend
            smooth
            autoDraw
            autoDrawDuration={3000}
            autoDrawEasing="ease-out"
            data={dataNew}
            gradient={['#4318FF', '#fff']}
            radius={4.8}
            strokeWidth={4.1}
            strokeLinecap={'butt'}
            width={50}
          />
          </div>
        </div>
      </div>
      <div className="main-statistic-middle"> 
        <div className="main-statistic-">

          <div className="main-statistic-middle-totalsales">
              <div className="main-statistic-middle-totalsales-left">
                <div className="main-statistic-middle-totalsales-header">
                  <div className="main-statistic-middle-totalsales-title">
                    TotalSales
                  </div>
                  <div>
                    $173,000
                  </div>
                </div>
                <div className="main-statistic-middle-totalsales-footer">
                  Since last month
                </div>
              </div>
              <div className="main-statistic-middle-totalsales-right">
                <Icon icon="fa:shopping-cart" color="white" height="25" />
              </div>
          </div>

          <div className="main-statistic-middle-siteuser">
              <div className="main-statistic-middle-siteuser-left">
                <div className="main-statistic-middle-siteuser-header">
                  <div className="main-statistic-middle-siteuser-title">
                    Today' Site USERS
                  </div>
                  <div className="main-statistic-middle-siteuser-num">
                    {todaySite ? todaySite : "0"}
                  </div>
                </div>
                <div className="main-statistic-middle-siteuser-footer">
                  Since last month
                </div>
              </div>
          </div>
        </div>

        <div className="main-statistic-middle-hottopic-main">
          <div className="main-statistic-middle-hottopic-header">
            Today Hot Topic
          </div>
          <div className="main-statistic-middle-hottopic-content-main">
            <div className="main-statistic-middle-hottopic-content-header">
              <div>
                Title
              </div>
              <div>
                UP
              </div>
            </div>
            <HotTopic />
          </div>
        </div>
      </div>
      <div className="main-footer-recent-main">
        <div className="main-footer-recent-header">
          Recent
        </div>
        <div className="main-footer-recent-content-main">
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
          <RecentTopic/>
        </div>
      </div>
    </div>
  )
}

export default MainIndex;
