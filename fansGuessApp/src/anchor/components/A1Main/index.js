import React, { useState, useEffect } from 'react'
import './index.scss'
import api from '../../../service/api'
import { Button, Icon, Cascader, Select } from 'antd'
import SelectBox from '../TabControl/SelectBox'
import CascaderBox from '../TabControl/CascaderBox'
import { getInitData, setInviteData } from '../../anchorModel'
import { setGameID } from '../../../utils/util'
const MainView = (props) => {
  console.log('==========Main=============',props);
  const [categoryOpt, setCategoryOpt] = useState();
  const [timpOpt, setTimpOpt] = useState();
  const [time, setTime] = useState();
  const [timeBoxVis, setTimeBoxVis] = useState(false);
  const [category, setCategory] = useState();
  const [classBoxVis, setClassBoxVis] = useState(false);

  async function init() {
    console.log('--request---');
    const initData = await getInitData()
    console.log('=====getInitData=======', initData);
    const { category, time } = initData;
    setCategoryOpt(category);
    setTimpOpt(time);
    const data = Object.keys(category || []);

    setCategory(category[data[0]][0]);
    setTime(time[0]);
  }
  useEffect(() => {
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

  async function handleInvite(payload) {
    const res = await setInviteData(payload);
    console.log('----invite----', res);
    setGameID(res.gameid);
    props.history.push('/loading');
  }

  function handleClick() {
    const payload = {
      categoryname: category,
      time: time
    }
    handleInvite(payload);
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
            <span className="select time-select" onClick={() => {setTimeBoxVis(true)}}>{time == "0"? "现在": `${time}分钟` }<Icon className="select-icon" fill="white" type="caret-down" /></span>
        </div>  
        {classBoxVis && <div  className="cascader-box"><CascaderBox option={categoryOpt} onChange={handleClassChange}/></div>}
        {timeBoxVis && <div  className="time-box"><SelectBox option={timpOpt} onChange={handleTimeChange} /></div>}
      </div> 
      <Button className="start-button" onClick={handleClick}>发出邀请</Button>
      
    </div>
  )
}

export default MainView