import React, { useState, useEffect } from 'react'
import { useInterval } from '../../../utils/useHooks'
import { getAwaitTime, getAwaitNum, quitGame, joinGame } from '../../anchorModel'
import './index.scss'
import Modal from '../../../common/Modal'
import {Button} from 'antd'
import { getGameID } from '../../../utils/util'

const LoadingView = (props) => {
    const [now, setNow] = useState(true);
    const [time, setTime] = useState(1);
    const [timer, setTimer] = useState(-1);
    const [userNumber, setUsesrNumber] = useState(0);

    const [modalText, setModalText] = useState("");
    const [modalVis, setModalVis] = useState(false);

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

    hyExt.observer.on('waitNum', message => {
      console.log('==========收到小程序后台推送过来的消息======',message);
      hyExt.logger.info('收到小程序后台推送过来的消息', message)
    })

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


    function handleClick() {
      if(userNumber >= 1){
        const gameid = getGameID();
        console.log('=======getGameID===========', gameid);
        const payload = {
          gameid: gameid
        }
        joinGame(payload);
        props.history.push('/prepare');
      }
      else{
        setModalText("还没有人加入，请耐心等待");
        setModalVis(true);
      }
    }

    return (
      <div className="a2-container">
        <div className="a2-close" onClick={handleClose}></div>
        <div className="img-box">
          <img className="pig-loading" src={require("./images/pig-coin.gif")}></img>
        </div>
        <div style={{ zIndex: 1 }}>
        <div className="join-text">{`已有 `}<span className="join-number">{userNumber}</span>{` 人加入游戏`}</div>
        {!now && <div className="time-text">距离游戏开始还有 <span className="time-number">{`${Math.floor(timer/60)}:${timer%60}`}</span></div>}
        </div>
      	<Button className="start-btn" style={{visibility: now? "visible": "hidden" }} onClick={handleClick}>现在开始</Button>
        <div className="black-bg" style={{ height: `${Math.floor((timer/(time*60))*100)}%` }}></div>
      
        <Modal 
          style={{ zIndex: 20 }}
          visible={modalVis}
          text={modalText}
          btnText="我知道了"
          onClick={() => {setModalVis(false)}}
        />
      </div>
    )
}

export default LoadingView