import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import axios from 'axios';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import {useState} from 'react'
import { Icon } from '@iconify/react';
import "../static/board-write.css"
import { useNavigate } from 'react-router-dom';
import config from '../config/config.json'


function Write({login_eth, token, account}) {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const [MD, setMD] = useState();
  const [title, setTitle] = useState();

  const navigate = useNavigate();


  function handleEditorChange({ html, text }) {
    setMD(text);
  }

  function handleChange(event) {
    setTitle(event.target.value);
  }

  const writeRequest = async () => {
    const req = {
      title: title,
      content: MD,
      etherAddress: account,
      token: JSON.parse(window.localStorage.getItem("token"))
    };
    const res = await axios.post(config["API_SERVER_BOARD_POST"],req);
    console.log("res", res.data);
 

    navigate('/board');
  }

  return (
    <div className="main-index">
      <div className="community-write-header">
        write
      </div>
      <label>
        TITLE:
        <input type="text" name="name" onChange={handleChange} value={title}/>
      </label>
      <MdEditor style={{ height: '500px'}} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />

      <div className="community-write-button-main">
        <div className="community-write-button-box community-write-button-down">
          <Icon icon="jam:write" color="#868cff" height="3.5vh"/>
          <div className="community-write-button-text" onClick={token != null ? () => writeRequest() : () => login_eth()}>
            write
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write;
