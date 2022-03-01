import '../static/sidebar.css'
import Log from '../assets/logo.svg'
import { Icon } from '@iconify/react';
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

function Sidebar() {

        //<img src={Log} type="image/svg+xml"/> 
  const [style, setStyle] = useState(() => JSON.parse(window.localStorage.getItem("style")));
  const activeIconStyle = "#4318FF";
  const deactiveIconStyle = "#A3AED0";

  
  var varStyle = {};
  const activeTextStyle = {
    coloe: "#1B2559"
  }
  const activeLine = {
    "border-right": "3px solid #4318FF"
  }
  
  const deactiveStyle = {
    color: "#A3AED0",
  }
  const deactiveLineStyle = {
    color: "#ffffff"
  }

  useEffect(() => {
    window.localStorage.setItem("style", JSON.stringify(style));
  }, [style]);



  const helo = (a, e) => {
    
    for(let i = 0; i < 10; i++) {
      varStyle[i] = {
        text: deactiveStyle,
        icon: deactiveIconStyle,
        line: deactiveLineStyle,
      }
    }

    varStyle[a]["text"] = activeTextStyle;
    varStyle[a]["icon"] = activeIconStyle;
    varStyle[a]["line"] = activeLine;

    setStyle(varStyle);
    console.log(style);
  }

  return (
    <div className="sidebar-main">
      <div className="sidebar-logo">
        <div className="sidebar-logo-img">
          <img src={Log} type="image/svg+xml" alt="logo"/> 
        </div>
        <div className="sidebar-siteName">
          <div className="sidebar-siteName-support">
              kswap
          </div>
        </div>
      </div>
      <div className="sidebar-link-main">
        <div className="sidebar-link-div-main">
          <div className="sidebar-link-icon-name">
            <Icon icon="ic:round-dashboard" color={style ? style[6]["icon"] : activeIconStyle} height="24" />
            <div style={style ? style[6]["text"] : activeTextStyle} className="sidebar-link-name" onClick={(e) => helo(6, e)}>
              <Link to="/"> DashBoard </Link>
            </div>
          </div>
          <div style={style ? style[6]["line"] : activeLine}>
          </div>
        </div>
        <div className="sidebar-link-div-main">
          <div className="sidebar-link-icon-name">
            <Icon icon="oi:graph" color={style ? style[5]["icon"] : deactiveIconStyle} height="24" />

            <div style={style ? style[5]["text"] : deactiveStyle} className="sidebar-link-name" onClick={(e) => helo(5, e)}>
              Activity
            </div>
          </div>
          <div style={style ? style[5]["line"] : null}>
          </div>
        </div>
        <div className="sidebar-link-div-main" style={activeTextStyle}>
          <div className="sidebar-link-icon-name">
            <Icon icon="ant-design:wallet-outlined" color={style ? style[4]["icon"] : deactiveIconStyle} height="24" />

            <div style={style ? style[4]["text"] : deactiveStyle} className="sidebar-link-name" onClick={(e) => helo(4, e)}>
              Payout 
            </div>
          </div>
          <div style={style ? style[4]["line"] : null}>
          </div>
        </div>
        <div className="sidebar-link-div-main">
          <div className="sidebar-link-icon-name">
            <Icon icon="ic:round-how-to-vote" color={style ? style[3]["icon"] : deactiveIconStyle} height="24" />

            <div style={style ? style[3]["text"] : deactiveStyle} className="sidebar-link-name" onClick={(e) => helo(3, e)}>
              Proposal
            </div>
          </div>
          <div style={style ? style[3]["line"] : null}>
          </div>
        </div>
        <div className="sidebar-link-div-main">
          <div className="sidebar-link-icon-name">
          <Icon icon="gg:clapper-board" color={style ? style[2]["icon"] : deactiveIconStyle} height="24" />
            <div style={style ? style[2]["text"] : deactiveStyle} className="sidebar-link-name" onClick={(e) => helo(2, e)}>
              Community
            </div>
          </div>
          <div style={style ? style[2]["line"] : null}>
          </div>
        </div>
        <div className="sidebar-link-div-main">
          <div className="sidebar-link-icon-name">
            <Icon icon="bytesize:settings" color={style ? style[1]["icon"] : deactiveIconStyle} height="24" />
            <div style={style ? style[1]["text"] : deactiveStyle} className="sidebar-link-name" onClick={(e) => helo(1, e)}>
              Settings
            </div>
          </div>
          <div style={style ? style[1]["line"] : null}>
          </div>
        </div>
      </div>
      <div className="sidebar-footer">
      </div>
    </div>
  );
}

export default Sidebar;
