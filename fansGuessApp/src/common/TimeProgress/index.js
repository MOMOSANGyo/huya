import React, { useState } from 'react'
import blackBg from '../images/progress-black.png'
import purpleBg from '../images/progress-purple.png'
import './index.scss'
import classnames from 'classnames'
import { useInterval } from '../../utils/useHooks'
function TimeProgress(props) {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount(count + 1);
  }, count < 60 ? 1000 : null);
  return(
    <div style={{ ...props.style, position: 'relative' }}>
      <div className="time-progress-container">
        <div className="title-text"
          style={{ color: props.theme === 'black'? '#000000' : '#ffffff' }}
        >倒计时<br />/秒</div>
        <div className="progress-bg" 
          style={{ backgroundImage: `url(${props.theme === 'black'? blackBg : purpleBg})` }}
        >
        </div>
        <div className="progress-filler"
          style={{ backgroundColor: props.theme === 'black'? '#474747' : '#d7579f',
           width: Math.floor((count/60)*232)
        }}
        ></div>
        <div className="progress-number" 
          style={{ color: props.theme === 'black'? '#2b2b2b' : '#d7579f' }}
        >{60 - count}</div>
      </div>
    </div>
  );
}

export default TimeProgress;

