import './static/main.css';
import Web3 from 'web3'
import abi from './abi/reward.js'
import Sidebar from './componant/sidebar.js'
import MainIndex from './componant/main-index.js'
import Profile from './componant/right-profile.js'
import TopicView from './componant/board-view.js'
import Write from './componant/board-write.js'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Web3Token from 'web3-token'
import Community from './componant/community.js'
import {useState, useEffect} from 'react'

const test = () => {
  
  const PRIVATE_KEY = '1b95ae5c385641c009c25f89ff62e7088854b5cc39a6107654a623a1039e249b';
  const END_POINT = 'https://ropsten.infura.io/v3/919227b4a0ce4359a847fdae2cebde84';


  const ContractAddress = '0x7Ddc333Cb0df7dACD866E44F3807aAEaAEcF3229';
  const OwnerAddress = '0x8772901ea06D450C18A92a53927Ba63EFcC97Dbe';

  var address = [
    '0xa179C868E21aD4C288f6084Eb349000Ba8623AeA',
    '0x09360bf8d0AB583588B26D17a1D9E85cd1DaB991',
    '0xd8d450cB00221f4CdD6Aa122220337d672A3C09d',
  ]
  const web3 = new Web3(new Web3.providers.HttpProvider(END_POINT));
  const signer = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);

  // eslint-disable-next-line no-unused-vars
  // var a = contract.methods.myFunction().call();


  var contract = new web3.eth.Contract(abi, ContractAddress, {from: OwnerAddress});
  var data = contract.methods.multiTransferToken(address, '1000000000000000000').encodeABI();
  var rawTrx = {"to": ContractAddress, "gas": 2000000, "data": data};

// multiTransferToken
  const buttonClick = () => {
    signer.signTransaction(rawTrx)
      .then(signed => {
        console.log(signed);
        web3.eth.sendSignedTransaction(signed.rawTransaction)}
      ) 
      .then(req => console.log("req", req));
  }
}


function App() {

  const [acc, setAcc] = useState(() => JSON.parse(window.localStorage.getItem("account")));
  const [web3, setWeb3] = useState();
  const [token, setToken] = useState(() => JSON.parse(window.localStorage.getItem("token")));
  
  const navigate = useNavigate();


  const login_eth = async () => {
    if (typeof window.ethereum === 'undefined') {
      console.log("meta meta")
      window.open("https://metamask.io/download.html");
    }

    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    const account = accounts[0];
    const web3 =  new Web3(window.ethereum);
    const token_app = await Web3Token.sign(msg => web3.eth.personal.sign(msg, account), '1d');

    setAcc(account);
    setWeb3(web3);
    setToken(token_app);
    window.localStorage.setItem("token", JSON.stringify(token));
    window.localStorage.setItem("account", JSON.stringify(account));
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
        <Route path="/" element={<MainIndex acc={acc} />}/>
        <Route path="/board/view/:id" element={<TopicView/> } />
        <Route path="/board" element={<Community token={token} login_eth={login_eth}/>}/>
        <Route path="/write" element={<Write login_eth={login_eth} token={token} account={acc}/>}/>
      </Routes>
      <Profile login={login_eth} logout_eth={logout_eth} token={token} acc={acc}/>

    </div>
  );
}

export default App;
