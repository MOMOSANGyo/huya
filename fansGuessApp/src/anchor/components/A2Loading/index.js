import React, { useState, useEffect } from 'react'
import { useInterval } from '../../../utils/useHooks'
import { getAwaitTime, getAwaitNum, quitGame } from '../../anchorModel'
import './index.scss'
import {Button} from 'antd'
import { getGameID } from '../../../utils/util'

const LoadingView = (props) => {
    const [now, setNow] = useState(false);
    const [time, setTime] = useState(1);
    const [timer, setTimer] = useState(-1);
    const [userNumber, setUsesrNumber] = useState(0);

    async function init() {
      const gameid = getGameID();
      console.log('=======a2getGameID===========', gameid);
      const payload = {
        gameid: gameid
      }
      const res = await getAwaitTime(payload);
      console.log('=======a2getAwaitTime===========', res);
      const mTime = res.time;

      if(mTime == 0) {
        setTimer(0);
        setNow(true);
      }
      else {
        setTime(mTime);
        setTimer(parseInt(mTime)*60);
        setNow(false);
      }
    }
    useInterval(async () => {
      const gameid = getGameID();
      console.log('=======a2getGameID===========', gameid);
      const payload = {
        gameid: gameid
      }
      const res = await getAwaitNum(payload);
      console.log('=======getAwaitNum====res=======', res);
      const n = res.num;
      setUsesrNumber(n)
    }, 1000);

    useInterval(() => {
      setTimer(timer - 1);
    }, timer >= 1 ? 1000 : null);


    useEffect(() => {
      init();
    }, [])

    useEffect(() => {
      console.log('=====timer===', timer, now);
      if(timer <= 0) {
        setNow(true);
      }
      else {
        setNow(false);
      }
    },[timer]);

    function handleClose(e) {
      e.stopPropagation();
      e.preventDefault();
      const gameid = getGameID();
      console.log('=======a2getGameID===========', gameid);
      const payload = {
        gameid: gameid
      }
      quitGame(payload);
      props.history.push('/main');
    }

    return (
      <div className="a2-container">
        <div className="a2-close" onClick={handleClose}></div>
        <div className="img-box">
          <img className="pig-loading" src={require("./images/pig-coin.gif")}></img>
        </div>
      	<div className="join-text">已有<span className="join-number">{userNumber}</span>人加入游戏</div>
        {!now && <div className="time-text">距离游戏开始还有<span className="time-number">{`${Math.floor(timer/60)}:${timer%60}`}</span></div>}
        {now && <Button className="start-btn" onClick={() => {props.history.push('/prepare')}}>现在开始</Button>}
        <div className="black-bg" style={{ height: `${Math.floor((timer/(time*60))*100)}%` }}></div>
      </div>
    )
}

export default LoadingView