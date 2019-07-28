import React, { useState, useEffect } from 'react'
import './index.scss'
import api from '../../../service/api'
import { Button, Icon, Cascader, Select } from 'antd'
import SelectBox from '../TabControl/SelectBox'
import CascaderBox from '../TabControl/CascaderBox'
const MainView = (props) => {
  console.log('==========Main=============',props);
  const [sourceData, setSourceData] = useState({});
  const [time, setTime] = useState("现在");
  const [timeBoxVis, setTimeBoxVis] = useState(false);
  const [category, setCategory] = useState("王者荣耀");
  const [classBoxVis, setClassBoxVis] = useState(false);

  useEffect(() => {
    async function init() {
      const data = await api.request({service: 'index/', method: 'POST',param: {request: '---真爱猜词----'}});
      console.log('---data--', data);
    }

    init();

  },[]);


  function handleTimeChange(value){
    if(value){
      setTime(value);
    }
    setTimeBoxVis(false);
  }

  function handleClassChange(value){
    if(value){
      setCategory(value);
    }
    setClassBoxVis(false);
  }
  return (
    <div className="a1-container">
      <div className="title-img"></div>
      <div className="a1-introduce">
        <div className="introduce-text">如何测试真爱粉？看看粉丝能否猜中你心中所想~<br />
          在1分钟时间内，主播要描述1个词语，粉丝根据主播的描述猜词<br />
          主播不能轻易让粉丝猜中，如果25%-75%的粉丝猜中词语，主播胜利，<br />
          否则主播失败。<br />
          主播胜利一词得1分，失败不得分。粉丝猜中一词得1分，猜错不得分。<br />
          每轮游戏10个词语，一轮游戏结束后公布粉丝排名比分。</div>
      </div>
      <div className="select-button">
        <div className="category">
            <span className="label-word">词语类别</span>
            <span className="select category-cascader" onClick={() => {setClassBoxVis(true)}}>{category}<Icon className="select-icon" fill='white' type="caret-down" /></span>
        </div>
        <div className="start-time">
            <span className="label-word">开始时间</span>
            <span className="select time-select" onClick={() => {setTimeBoxVis(true)}}>{time}<Icon className="select-icon" fill="white" type="caret-down" /></span>
        </div>  
      </div> 
      <Button className="start-button" onClick={() => {props.history.push('/loading')}}>发出邀请</Button>
      {classBoxVis && <div  className="cascader-box"><CascaderBox onChange={handleClassChange}/></div>}
      {timeBoxVis && <div  className="time-box"><SelectBox onChange={handleTimeChange} /></div>}
    </div>
  )
}

export default MainView