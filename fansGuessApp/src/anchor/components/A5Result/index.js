import React, { useEffect, useState } from 'react'
import './index.scss'
import {Button} from 'antd'
import ResultProgress from '../ResultProgerss'
import EndRank from '../../../common/EndRank'
import { getGameWordGrade, nextWord } from '../../anchorModel'
import { getGameID, setGameWordID, getGameWordID } from '../../../utils/util'
import { gameBg } from '../../assets/imgConfig'

const numberText = [
  '第一题',
  '第二题',
  '第三题',
  '第四题',
  '第五题',
  '第六题',
  '第七题',
  '第八题',
  '第九题',
  '第十题',
]
let arr = [
  {
    url: "./icon.png",
    name: "user",
    time: "1秒"
  }
];

let fRes = [
  '错误回答',
  '全职高手'
]

const ResultView = (props) => {
  const [gameNumber, setGameNumber] = useState(0);
  const [listData, setListData] = useState([]);
  const [errWords, setErrWords] = useState([]);
  const [words, setWords] = useState("");
  const [winNum, setWinNum] = useState(0);
  const [totalNum, setTotalNum] = useState(0);
  const [gameStatus, setGameStatus] = useState(0);
  const [success, setSuccess] = useState(false);

  async function init() {
    const gameid = getGameID();
    const gamewordid = getGameWordID();
    console.log('=======a5getGameID===========', gameid, gamewordid);
    const payload = {
      gameid: gameid,
      gamewordid: gamewordid
    }
    const res = await getGameWordGrade(payload);
    console.log('====getGameWordGrade=====',res);
    const questionnum = res.questionnum;
    setGameNumber(questionnum);
    const realanswer = res.realanswer;
    setWords(realanswer);
    const realnum = res.realnum;
    setWinNum(realnum);
    const total = res.total;
    setTotalNum(total);
    const status = res.status;
    setGameStatus(status);
    const winInfo = res.winInfo;
    console.log('======winInfo========', winInfo);
    setListData(winInfo);
    const wronganswer = res.wronganswer;
    console.log('======wronganswer========', wronganswer);
    setErrWords(wronganswer);
    setSuccess(true);
  }

  useEffect(() => {
    init();
  }, []);

  function renderText() {
    let res = ""
    if(winNum < Math.floor(totalNum/4)) {
      res = " 人猜对，太少了，不行啊";
    }
    else if( winNum > Math.floor((totalNum/4) * 3)) {
      res = " 人猜对，太多了，不行啊";
    }
    else {
      res = " 人猜对，厉害了！"
    }
    return res;
  }

  function handleClick() {
    const gameid = getGameID();
    console.log('=======handleClick===========', gameid);
    const payload = {
      gameid: gameid,
    }
    nextWord(payload);
    if(gameStatus == 0) {
      props.history.push('/play');
    }
    else {
      props.history.push('/score');
    }
  }
  console.log('------result-----', listData, errWords);

  return (
    <div className="a5-container" 
      style={{ backgroundImage: `url(${gameBg[gameNumber]})` }} 
    >
      <div className="question-header">
        <span className="h-number">{numberText[gameNumber]}</span>
        <span className="h-text">{words}</span>
      </div>
      <ResultProgress rightPeople={winNum} totle={totalNum} />
      <div className="result-text" >{`共 `}
        <span className="result-people"
          style={{ color: (winNum < Math.floor(totalNum/4) || winNum > Math.floor((totalNum/4) *3))?
          '#ff6b6b': '#ffde00' }}
        >{winNum}</span>
      {renderText()}</div>
        {success && <EndRank res={listData} fRes={errWords} number={3} fNumber={3} />}
      <Button className="next-btn" onClick={handleClick}>下一题</Button>
    </div>
    )
}

export default ResultView