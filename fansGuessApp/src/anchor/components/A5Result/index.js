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
  const [score, setScore] = useState(true);
  const [gamewordtime, setGamewordtime] = useState();

  async function init() {
    const gameid = getGameID();
    const gamewordid = getGameWordID();

    const payload = {
      gameid: gameid,
      gamewordid: gamewordid
    }
    const res = await getGameWordGrade(payload);

    const questionnum = res.wordnumber || 0;
    setGameNumber(questionnum);
    const realanswer = res.realanswer || "";
    setWords(realanswer);
    const realnum = res.rightperson || 0;
    setWinNum(realnum);
    const total = res.totalperson || 0;
    setTotalNum(total);
    const status = res.status || 0;
    setGameStatus(status);
    const winInfo = res.winInfo || [];

    setListData(winInfo);
    const wronganswer = res.wronganswer || [];
    setErrWords(wronganswer);
    const score = res.score === 1? true: false;
    setScore(score);
    setSuccess(true);
  }

  useEffect(() => {
    init();
  }, []);

  function renderText() {
    let res = ""
    if(winNum < Math.floor(totalNum/4)) {
      res = " 人猜对，不行啊";
    }
    else if( winNum > Math.floor((totalNum/4) * 3)) {
      res = " 人猜对，不行啊";
    }
    else {
      res = " 人猜对，厉害了！"
    }
    return res;
  }

  function handleClick() {
    const gameid = getGameID();
    const payload = {
      gameid: gameid,
    }
    nextWord(payload).then(res => {
      alert(res);
      if(res.success == 1){
        if(gameStatus == 0) {
          props.history.push(`/play/${gamewordtime}`);
        }
        else {
          props.history.push('/score');
        }
      }
    });
  }

  return (
    <div className="a5-container" 
      style={{ backgroundImage: `url(${gameBg[gameNumber]})` }} 
    >
      <div className="question-header">
        <span className="h-number">{numberText[gameNumber]}</span>
        <span className="h-text">{words}</span>
      </div>
      <div>
        <ResultProgress rightPeople={winNum} totle={totalNum} isWin={score}/>
        <div className="result-text" >{`共 `}
          <span className="result-people"
            style={{ color: (winNum < Math.floor(totalNum/4) || winNum > Math.floor((totalNum/4) *3))?
            '#ff6b6b': '#ffde00' }}
          >{winNum}</span>
        {renderText()}</div>
        <div className="result-introduce-text">(20人参与游戏，只有5-15人猜对答案才可获胜)</div>
      </div>
      <div>
        <div className="result-endrank">
          {success && <EndRank res={listData} fRes={errWords} number={7} fNumber={7} />}
        </div>
        <Button className="next-btn" onClick={handleClick}>{gameNumber==9?"最终结果":"下一题"}</Button>
      </div>
      
    </div>
    )
}

export default ResultView