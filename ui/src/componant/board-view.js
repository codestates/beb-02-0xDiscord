import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import ViewBoard from './get_view_props.js';


const TopicView = () => {
  const params = useParams();
  const [data, setData] = useState();
  const test = "## helo"


  

  
  return (
    <div className="main-index">
      <ViewBoard id={params.id} />
    </div>
  ) 
}

export default TopicView;
