import '../static/right-profile.css'
import {useState} from 'react'
import Countdown from 'react-countdown';
import TimeToken from './time.js'
function Profile({login, logout_eth, token}) {




  return (
    <div className="right-profile">
      {
        token == null ?
        <button onClick={login}> log in </button>
        :
        <button onClick={() => logout_eth()}> log out </button>
      }
      <TimeToken/>
    </div>
  )

}

export default Profile;
