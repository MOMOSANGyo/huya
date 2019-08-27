import React, { useState, useEffect } from 'react'
import './index.scss'
import api from '../../../service/api'
import { Button, Icon, Cascader, Select } from 'antd'
import SelectBox from '../TabControl/SelectBox'
import CascaderBox from '../TabControl/CascaderBox'

import { getInitData, setInviteData, initialPre } from '../../anchorModel'

import { setGameID, setGameWordID } from '../../../utils/util'
const MainView = (props) => {
  const [isUseBlur, setIsuseBlur] = useState(true);

  console.log('==========Main=============',props);
  const [categoryOpt, setCategoryOpt] = useState();
  const [timpOpt, setTimpOpt] = useState();
  const [wordTimpOpt, setWordTimpOpt] = useState();
  const [time, setTime] = useState("0");
  const [timeBoxVis, setTimeBoxVis] = useState(false);
  const [category, setCategory] = useState();
  const [classBoxVis, setClassBoxVis] = useState(false);
  const [wordTime, setWordTime] = useState("0");
  const [wordTimeBoxVis, setWordTimeBoxVis] = useState(false);
  const [wordTimetipVis, setWordTimetipVis] = useState(false);

  async function init() {
    const initPre = await initialPre();
    const status = initPre.status;
    if(status == 2){
      const initData = await getInitData();
      console.log('=====getInitData=======', initData);
      const { category, time } = initData;
      setCategoryOpt(category);
      setTimpOpt(time);
      const data = Object.keys(category || []);

      setCategory(category[data[0]][0]);
      setTime(time[0]);

      setWordTimpOpt(['30','45', '60', '90']);
      setWordTime('60');
    }
    else if(status === 0) {
      const timebool = initPre.timebool;
      const gametime = initPre.gametime;
        props.history.push(`/loading/${timebool}/${gametime}`);  
    }
    else if(status === 3) {
      const gameid = initPre.gameid;
      setGameID(gameid);
      const gametime = initPre.gametime;
      props.history.push(`/prepare/${gametime}`);
    }
    else if(status === 1) {
      const gameid = initPre.gameid;
      setGameID(gameid);
      const gamewordtime = initPre.gamewordtime;
      props.history.push(`/play/${gamewordtime}`);
    }
    else if(status === 4) {
      const gameid = initPre.gameid;
      setGameID(gameid);
      const gamewordid = initPre.gamewordid;
      setGameWordID(gamewordid);
      props.history.push('/result');
    }
    
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

  function handleWordTimeChange(value){
    if(value){
      setWordTime(value);
    }
    setWordTimeBoxVis(false);
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
    props.history.push('/loading/undefined/undefined');
  }

  function handleClick() {
    const payload = {
      categoryname: category,
      time: time,
      questiontime: wordTime
    }
    handleInvite(payload);
  }

  return (
    <div className="a1-container">
      <div></div>
      <div className="title-img"></div>
      <div className="a1-introduce">
      </div>
      <div className="select-button">
        <div className="category" >
            <span className="label-word">词语类别</span>
            <span className="select category-cascader" 
              onClick={() => {setClassBoxVis(true)}}
              tabIndex="1" onBlur={() => { isUseBlur && setClassBoxVis(false)}}
            >
              {category}
              <Icon className="select-icon" style={{color: '#00ccff'}} type="caret-down" />
            </span>
        </div>
        <div className="start-time">
            <span className="label-word">开始时间</span>
            <span className="select time-select" 
              onClick={() => {setTimeBoxVis(true)}}
              tabIndex="2" onBlur={() => { isUseBlur && setTimeBoxVis(false)}}
            >
              {time == "0"? "现在": `${time}分钟` }
              <Icon className="select-icon" style={{color: '#ffea00'}} type="caret-down" />
            </span>
        </div>  
        <div className="word-time">
            <span 
              className="label-word"
              onMouseEnter={() => {setWordTimetipVis(true)}}
              onMouseLeave={() => {setWordTimetipVis(false)}}
            >每词时长</span>
            <span className="select wordtime-select" 
              tabIndex="3" onBlur={() => { isUseBlur && setWordTimeBoxVis(false)}}
              onClick={() => {setWordTimeBoxVis(true)}}
            >
              {`${wordTime}秒` }
              <Icon className="select-icon" style={{color: '#ff216a'}} type="caret-down" />
            </span>
        </div>  
        {wordTimetipVis && <div  
          className="wordtime-tooltip"
        >
          设定每个词语出现的时间，观众要在该时间内完成猜词
        </div>}
        {classBoxVis && <div  className="cascader-box">
          <CascaderBox 
            option={categoryOpt} 
            onChange={handleClassChange}
            onMouseEnter={() => {setIsuseBlur(false)}}
            onMouseLeave={() => {setIsuseBlur(true)}}
          />
        </div>}
        {timeBoxVis && <div  className="time-box">
          <SelectBox 
            option={timpOpt} 
            onChange={handleTimeChange} 
            onMouseEnter={() => {setIsuseBlur(false)}}
            onMouseLeave={() => {setIsuseBlur(true)}}
          />
        </div>}
        {wordTimeBoxVis && <div  className="wordtime-box">
          <SelectBox 
            option={wordTimpOpt} 
            onChange={handleWordTimeChange} 
            onMouseEnter={() => {setIsuseBlur(false)}}
            onMouseLeave={() => {setIsuseBlur(true)}}
          />
        </div>}
      </div> 
      <Button className="start-button" onClick={handleClick}>发出邀请</Button>
    </div>
  )
}

export default MainView