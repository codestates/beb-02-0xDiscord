import './static/main.css';
import Web3 from 'web3'
import abi from './abi/reward.js'
import Sidebar from './componant/sidebar.js'
import MainIndex from './componant/main-index.js'
import Profile from './componant/right-profile.js'
import TopicView from './componant/board-view.js'
import Write from './componant/board-write.js'
import { Route, Routes } from 'react-router-dom';
import Community from './componant/community.js'
import {useState, useEffect} from 'react'
import Web3Token from 'web3-token'
import config from './config/config.json'

import axios from 'axios'


function App() {


  const [acc, setAcc] = useState(() => JSON.parse(window.localStorage.getItem("account")));
  const [web3, setWeb3] = useState();
  const [token, setToken] = useState(() => JSON.parse(window.localStorage.getItem("token")));
  const [siteToken, setSiteToken] = useState();
  const [todaySite, setTodaySite] = useState();
  const [newClient, setTodayNewClient] = useState();


  const CONTRACT_ADDRESS = config["CONTENT_ADDRESS"]


  useEffect( () => {
    async function statis() {
      const res = await axios.get(config["API_SERVER_URL"] + 'api/v0.1/statis')
      const resData = res.data[0]
      setTodaySite(resData["today_site_user"]);
      setTodayNewClient(resData["today_new_client"]);

      var varStyle = {};
      for(let i = 0; i < 10; i++) {
        varStyle[i] = {
          text: "",
          icon: "",
          line: "",
        }
      }
     window.localStorage.setItem("style", JSON.stringify(varStyle));
    }
    statis();

    

  }, []);
  


  const login_eth = async () => {
    if (typeof window.ethereum === 'undefined') {
      console.log("meta meta")
      window.open("https://metamask.io/download.html");
    }

    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    const account = accounts[0];
    const web3 =  new Web3(window.ethereum);
    const token_app = await Web3Token.sign(msg => web3.eth.personal.sign(msg, account), '1d');

    console.log(token_app)
    setAcc(account);
    setWeb3(web3);
    setToken(token_app);
    window.localStorage.removeItem('token')
    window.localStorage.setItem("token", JSON.stringify(token_app));
    window.localStorage.setItem("account", JSON.stringify(account));

    const cont = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    cont.methods.balanceOf(account).call()
      .then( result => {
        setSiteToken(result);
      });
  }

  const logout_eth = () => {
    console.log(token);
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("account")
    setToken(() => JSON.parse(window.localStorage.getItem("token")));
    setAcc(() => JSON.parse(window.localStorage.getItem("account")));
    setWeb3();
    // eslint-disable-next-line no-undef
  }


  return (
    <div className="App">
      <Sidebar/>
      <Routes>
        <Route path="/" element={<MainIndex acc={acc} siteToken={siteToken} todaySite={todaySite} newClient={newClient}/>}/>
        <Route path="/board/view/:id" element={<TopicView/> } />
        <Route path="/board" element={<Community token={token} login_eth={login_eth}/>}/>
        <Route path="/write" element={<Write login_eth={login_eth} token={token} account={acc}/>}/>
      </Routes>
      <Profile login={login_eth}  logout_eth={logout_eth} token={token} acc={acc}/>

    </div>
  );
}

export default App;
