import React, { useState, useEffect } from 'react'
import './index.scss'
import {Button} from 'antd'
import RankList from '../RankList';
import ERank from '../../../common/ERank'
import { scoreImg, scoreBG } from './config'
import { getGameLastInfo } from '../../anchorModel'
import { getGameID, getGameWordID } from '../../../utils/util'

const ScoreView = (props) => {
  const [listData, setListData] = useState([]);
  const [lastScore, setLastScore] = useState(0);
  const [totalNum, setTotalNum] = useState(0);
  const [showtext, setShowText] = useState("这么强！你是魔鬼吗");

  async function init() {
    const gameid = getGameID();
    const gamewordid = getGameWordID();
    // console.log('=======a6getGameID===========', gameid, gamewordid);
    const payload = {
      gameid: gameid,
      gamewordid: gamewordid
    }
    const res = await getGameLastInfo(payload);
    // console.log('====getGameLastInfo=====',res);
    const score = res.score;
    setLastScore(score);
    const info = res.info;
    setListData(info);
    const total = res.totalperson;
    setTotalNum(total);    
  }


  useEffect(() => {
    init();
  },[])

  function renderText() {
    let res = ""
    if(lastScore == 0) {
      res = "你是来搞笑的吗";
    }
    else if (lastScore >= 1 &&  lastScore <= 2) {
      res = "年轻人，你很有潜力";
    }
    else if( lastScore >= 3 &&  lastScore <= 5) {
      res = "还不错，下次高分就是你";
    }
    else if( lastScore >= 6 &&  lastScore <= 7) {
      res = "非常可以，干得漂亮";
    }
    else if( lastScore >= 8 &&  lastScore <= 9) {
      res = "你是魔鬼吧";
    }
    else if(lastScore == 10) 
    {
      res = "你是不是和粉丝串通好了"
    }
    return res;
  }

    return (
      <div className="a6-container" style={{ backgroundImage: `url(${scoreBG[lastScore]})` }}>
        <div className="a6-title" >我的得分</div>
        <img src={scoreImg[lastScore]} style={{zoom : '50%'}} />
        <div className="show-text">{renderText()}</div>
        <div>
          <div className="score-erank">
            <ERank res={listData} number={7} total={totalNum} />
          </div>
           <div className="btn-container">
            <Button className="again-btn" onClick={() => {props.history.push('/main')}}>再来一局</Button>
            <Button className="quit-btn" onClick={() => {props.history.push('/main')}}>退出游戏</Button>
          </div>
        </div>
      	
     </div>
    )
}

export default ScoreView