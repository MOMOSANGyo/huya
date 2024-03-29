import React, { useState, useEffect } from 'react'
import './index.scss'
import {Button} from 'antd'
import { useInterval } from '../../../utils/useHooks'
import TimeProgress from '../../../common/TimeProgress'
import ScoreList from '../ScoreList'
import { getGameWord, getGameWordInfo } from '../../anchorModel'
import { getGameID, setGameWordID, getGameWordID } from '../../../utils/util'
import { gameBg } from '../../assets/imgConfig'

// let arr = [
//   {
//     url: "./icon.png",
//     name: "user",
//     time: "4秒"
//   },
//   {
//     url: "./icon.png",
//     name: "user",
//     time: "5秒"
//   },
//   {
//     url: "./icon.png",
//     name: "user",
//     time: "8秒"
//   },
//   {
//     url: "./icon.png",
//     name: "user",
//     time: "3秒"
//   }
// ];

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

const PlayView = (props) => {
  const [category, setCategory] = useState("");
  const [gameNumber, setGameNumber] = useState(0);
  const [len, setLen] = useState("");
  const [listData, setListData] = useState([]);
  const [words, setWords] = useState("");
  const [userNum, setUserNum] = useState(0);
  const [totalNum, setTotalNum] = useState(0);
  const [startPolling, setStartPolling] = useState(false);

  async function init() {
    const gameid = getGameID();
    console.log('=======A4init=====gameid======', gameid);
    const payload = {
      gameid: gameid
    }
    const res = await getGameWord(payload);
    console.log('====A4init===gamewordid==',res);
    const gamewordid = res.gamewordid;
    setGameWordID(gamewordid);
    const categoryValue = res.category;
    const n = res.length;
    const text = res.wordtext;
    const number = res.wordnumber;
    setGameNumber(number);
    setCategory(categoryValue);
    setLen(n);
    setWords(text);
    setStartPolling(true);
  }

  useEffect(() => {
    init();
  }, [])

  useInterval(async () => {
    const gamewordid = getGameWordID();
    if(gamewordid) {
      const gameid = getGameID();
      console.log('=======a4 getGameID= gamewordid==========', gameid, gamewordid);
      const payload = {
        gameid: gameid,
        gamewordid: gamewordid
      }
      const res = await getGameWordInfo(payload);
      console.log('=======getGameWordInfo====res=======', res);

      const n = res.num;
      setUserNum(n);
      const total = res.total;
      setTotalNum(total);
      const listdata = res.userlist;
      setListData(listdata || []);
    }
  }, startPolling? 1000: null);

  function changeTime(time) {
    if(time >= 60) {
      props.history.push('/result');
    }
  }

  return (
    <div className="a4-container" 
      style={{ backgroundImage: `url(${gameBg[gameNumber]})` }}
    >
      <div>
        <div style={{ marginTop:6, fontSize: 15 }}>{numberText[gameNumber]}</div>
        <TimeProgress theme="black" style={{marginTop: 11}} onChange={changeTime}/>
      </div>
      <div>
        <div style={{ whiteSpace: 'pre'}}>类别:{`${category}`}     字数:{`${len}`}</div>
        <div className="word-container">
          {
            words.split('').map((item,i) => {
              return (<div className="word-box" key={i}>
                {item}
              </div>)
            })
          }
        </div>
      </div>
     <div>
      <ScoreList className="score-list" res={listData} num={userNum} total={totalNum} />
      <div className="tips">只有5-15人猜对答案才能获胜哦</div>
     </div>
    </div>
    )
}

export default PlayView