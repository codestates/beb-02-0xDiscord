import '../static/main-index.css'
import { Icon } from '@iconify/react';
import Trend from 'react-trend';

function MainIndex({acc}) {
  
  const MyComponent = () => <Trend data={[0, 10, 5, 22, 3.6, 11]} />;
 
  
  const YourComponent = () => (
    <Trend
      smooth
      autoDraw
      autoDrawDuration={3000}
      autoDrawEasing="ease-out"
      data={[0,2,5,9,5,10,3,1,2,10]}
      gradient={['#4318FF', '#fff']}
      radius={4.8}
      strokeWidth={4.1}
      strokeLinecap={'butt'}
      width={50}
    />
  );

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
            <Icon icon="healthicons:money-bag-outline" color="white" height="4vh" />
          </div>
          <div>
            <div className="main-statistic-title">
              Your Token
            </div>
            <div>
              {token}
            </div>
          </div>
          <div>
            <YourComponent/>
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
            <Icon icon="fluent:people-28-filled" color="white" height="4vh" />
          </div>
          <div>
            <div className="main-statistic-title">
              New Clients
            </div>
            <div>
              {token}
            </div>
          </div>
          <div>
            <YourComponent/>
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
                    3,200
                  </div>
                </div>
                <div className="main-statistic-middle-siteuser-footer">
                  Since last month
                </div>
              </div>
          </div>
        </div>

        <div className="main-statistic-middle-hottopic">
        </div>
      </div>
      <div className="main-footer">
          hello
      </div>
    </div>
  )
}

export default MainIndex;
