import '../static/right-profile.css'
import {useState} from 'react'

function Profile({login, logout_eth, token}) {


  return (
    <div className="right-profile">
      {
        token == null ?
        <button onClick={() => login()}> log in </button>
        :
        <button onClick={() => logout_eth()}> log out </button>
      }
    </div>
  )

}

export default Profile;
