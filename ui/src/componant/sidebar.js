import '../static/sidebar.css'
import Log from '../assets/logo.svg'
import { Icon } from '@iconify/react';
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

function Sidebar() {

        //<img src={Log} type="image/svg+xml"/> 
  const [style, setStyle] = useState(() => JSON.parse(window.localStorage.getItem("style")));
  const [before, setBefore] = useState(6);
  const deactiveIconStyle = "#A3AED0";

  
  var varStyle = {};

  const activeIconStyle = "#4318FF";
  const activeTextStyle = {
    color: "#1B2559"
  }
  const activeLine = {
    "border-right": "3px solid #4318FF"
  }


  const deactiveStyle = {
    color: "#A3AED0",
    "text-decoration": "none"
  }
  const deactiveLineStyle = {
    color: "#ffffff"
  }

  useEffect(() => {

    style[before]["text"] = activeTextStyle;
    style[before]["icon"] = activeIconStyle;
    style[before]["line"] = activeLine;

    for(let i = 0; i < 7; i++) {
      varStyle[i] = {
        text: deactiveStyle,
        icon: deactiveIconStyle,
        line: deactiveLineStyle,
      }
    }

    setStyle(varStyle);
  }, []);



  const helo = (a, e) => {

    style[before]["text"] = deactiveStyle;
    style[before]["icon"] = deactiveIconStyle;
    style[before]["line"] = deactiveLineStyle;

    style[a]["text"] = activeTextStyle;
    style[a]["icon"] = activeIconStyle;
    style[a]["line"] = activeLine;


    setBefore(a);
    setStyle(style);
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
          <div style={style[5]["line"]}>
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
              <Link to="/board" style={{textDecoration: "none" }}> Community </Link> 
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
