import React from 'react';
import axios from 'axios';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'https://cdn.skypack.dev/react-markdown@7?dts'
import "../static/view-board.css"
import { Icon } from '@iconify/react';
import config from '../config/config.json'

const mdParser = new MarkdownIt();
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}
const upRequest = async (id) => {
  await axios.get(config["API_SERVER_CONTENT_UP"] + id)
}

class ViewBoard extends React.Component {

  state = {
      viewData: []
  }

  componentDidMount() {
    console.log(this.props.test)
    axios.get( config["API_SERVER_CONTENT_VIEW"]+this.props.id)
      .then(res => {
        const resData = res.data;
        this.setState({viewData: resData[0]});
      });

  }

  render() {
    return (
      <div>
        <div className="board-view-info">
          Like: <Icon icon="ant-design:heart-filled" color="#f24e1e" />
          {this.state.viewData.up}
        </div>
        <div className="board-view-header">
          <ReactMarkdown>{"## " + this.state.viewData.title}</ReactMarkdown>
        </div>
        <div className="board-view-content">
          <ReactMarkdown>{this.state.viewData.content}</ReactMarkdown>
        </div>
        <div className="board-view-content-up-main" onClick={() => upRequest(this.state.viewData.id)}>
          <div className="board-view-content-up-sup">
            <div className="board-view-conent-up-icon">
              <Icon icon="bi:hand-thumbs-up-fill" color="white" height="2vh" />
            </div>
            <div>
              UP
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default ViewBoard;
