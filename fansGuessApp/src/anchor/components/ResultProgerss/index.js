import React, { useState, useEffect } from 'react'
import './index.scss'
import victoryBg from './images/success.png'
import defeatedBg from './images/failed.png'
import winIcon from './images/win-hand.png'
import failIcon from './images/fail-hand.png'
import classnames from 'classnames'

function ResultProgress(props) {
  const [result, setResult] = useState(false);
  const [resultBg, setResultBg] = useState();
  const [iconBg, setIconBg] = useState();
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    const rightPeople = props.rightPeople;
    const totle = props.totle;
    if(props.isWin) {
      setResultBg(victoryBg);
      setIconBg(winIcon);
      setIsWin(true); 
      setResult(true);   
    }
    else {
      setResultBg(defeatedBg);
      setIconBg(failIcon);
      setIsWin(false); 
      setResult(true);
    }

  },[props.isWin])
  return(
    <div style={{ ...props.style, position: 'relative' }}>
      { result && <div className="result-container">
        <img className="result-img" src={resultBg}/>
        <div className="progress-wrap" 
        style={{ width: !props.totle? 0: Math.floor((props.rightPeople/props.totle)*305) }}
        >
        <div className="progerss-box">
          <div className="result-filler">
              <div className="filler-one"></div>
              <div className="filler-two"></div>
              <div className="filler-three"></div>
              <div className="filler-four"></div>
              <div className="filler-five"></div>
              <div className="filler-six"></div>
          </div>
          <div className={`result-icon ${isWin? "icon-animation" : ""}`} style={{backgroundImage: `url(${iconBg})`}}></div>
        </div>
        </div>
      </div>}
    </div>
  );
}

export default ResultProgress;

