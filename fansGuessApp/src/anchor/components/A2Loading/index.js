import React, { useState, useEffect } from 'react'
import { useInterval } from '../../../utils/useHooks'
import './index.scss'
import {Button} from 'antd'

const LoadingView = (props) => {
    const [now, setNow] = useState(false);
    const [timer, setTimer] = useState(0);
    const [userNumber, setUsesrNumber] = useState(27);

    useInterval(() => {
      setTimer(timer - 1);
    }, timer >= 1 ? 100 : null);

    return (
      <div className="a2-container">
        <div className="a2-close"></div>
        <div className="img-box">
          <img className="pig-loading" src={require("./images/pig-coin.gif")}></img>
        </div>
      	<div className="join-text">已有<span className="join-number">{userNumber}</span>人加入游戏</div>
        {now && <div className="time-text">距离游戏开始还有<span className="time-number">{`${Math.floor(timer/60)}:${timer%60}`}</span></div>}
        {!now && <Button className="start-btn" onClick={() => {props.history.push('/prepare')}}>现在开始</Button>}
        <div className="black-bg" style={{ height: `${Math.floor((timer/300)*100)}%` }}></div>
      </div>
    )
}

export default LoadingView