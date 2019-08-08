import React, { useState, useEffect } from 'react'
import './index.scss'
import {Button} from 'antd'
import RankList from '../RankList';
import ERank from '../../../common/ERank'
import { scoreImg } from './config'
import { getGameLastInfo } from '../../anchorModel'
import { getGameID, getGameWordID } from '../../../utils/util'

let arr = [
  {
    url: "./icon.png",
    name: "user",
    score: "8分",
    time: "4秒"
  },
  {
    url: "./icon.png",
    name: "user",
    score: "8分",
    time: "5秒"
  },
  {
    url: "./icon.png",
    name: "user",
    score: "8分",
    time: "8秒"
  },
  {
    url: "./icon.png",
    name: "user",
    score: "8分",
    time: "3秒"
  }
];

const ScoreView = (props) => {
  const [listData, setListData] = useState([]);
  const [lastScore, setLastScore] = useState(1);
  const [totalNum, setTotalNum] = useState(0);
  const [showtext, setShowText] = useState("这么强！你是魔鬼吗");

  async function init() {
    const gameid = getGameID();
    const gamewordid = getGameWordID();
    console.log('=======a6getGameID===========', gameid, gamewordid);
    const payload = {
      gameid: gameid,
      gamewordid: gamewordid
    }
    const res = await getGameLastInfo(payload);
    console.log('====getGameLastInfo=====',res);
    const score = res.score;
    setLastScore(score);
    const info = res.info;
    setListData(info);
    const total = res.total;
    setTotalNum(total);    
  }


  useEffect(() => {
    init();
  },[])

  function renderText() {
    let res = ""
    if(lastScore <= 2) {
      res = "潜力无限，急需苦练";
    }
    else if( lastScore >= 3 &&  lastScore <= 5) {
      res = "还不错，下次高分就是你";
    }
    else if( lastScore >= 6 &&  lastScore <= 7) {
      res = "水平了得，话术高超";
    }
    else if( lastScore >= 8 &&  lastScore <= 9) {
      res = "这么强！你是魔鬼吗";
    }
    else if(lastScore == 10) 
    {
      res = "最强主播非你莫属"
    }
    return res;
  }

    return (
      <div className="a6-container">
        <div style={{ marginTop: 20,  }}>我的得分</div>
        <div className="totalscore-text" 
          style={{backgroundImage: `url(${scoreImg[lastScore]})`}}
        >
        </div>
        <div className="show-text">{renderText()}</div>
      	<ERank res={listData} number={4} length={totalNum} />
        <div className="btn-container">
          <Button className="again-btn" onClick={() => {props.history.push('/main')}}>再来一局</Button>
          <Button className="quit-btn" onClick={() => {props.history.push('/main')}}>退出游戏</Button>
        </div>
     </div>
    )
}

export default ScoreView