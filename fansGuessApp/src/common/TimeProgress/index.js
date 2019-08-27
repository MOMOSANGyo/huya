import React, { useState, useEffect } from 'react'
import blackBg from '../images/progress-black.png'
import purpleBg from '../images/progress-purple.png'
import './index.scss'
import classnames from 'classnames'
import { useInterval } from '../../utils/useHooks'
function TimeProgress(props) {
  console.log()
  const {onChange} = props;
  const [time, setTime] = useState();
  const [count, setCount] = useState(0);
  useInterval(() => {
    time && setCount(count + 1);
  }, count < time ? 1000 : null);

  useEffect(() => {
    onChange && onChange(count);
  }, [count, props.time]);
  useEffect(() => {
    setTime(props.time);
  },[props.time]);
console.log('==============state time============', time, typeof time);

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
           width: ((typeof time != "number") || time == 0) ? 0 : Math.floor(((time-count)/time)*232),left:props.left === 'user' ? '60px' :'53px'
        }}
        ></div>
        <div className="progress-number" 
          style={{ color: props.theme === 'black'? '#2b2b2b' : '#d7579f' }}
        >{((typeof time != "number") || time == 0)? 0 : (time - count)}</div>
      </div>
    </div>
  );
}

export default TimeProgress;

