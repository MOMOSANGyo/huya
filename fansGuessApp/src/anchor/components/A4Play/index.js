import React from 'react'
import './index.scss'
import {Button} from 'antd'
import TimeProgress from '../../../common/TimeProgress'
import ScoreList from '../ScoreList'

const words = "大吉大利"
let arr = [
  {
    url: "./icon.png",
    name: "user",
    time: "4秒"
  },
  {
    url: "./icon.png",
    name: "user",
    time: "5秒"
  },
  {
    url: "./icon.png",
    name: "user",
    time: "8秒"
  },
  {
    url: "./icon.png",
    name: "user",
    time: "3秒"
  }
];


const PlayView = (props) => {
    return (
      <div className="a4-container">
      	<TimeProgress theme="black" style={{marginTop: 40}} />
        <div style={{marginTop: 24}}>{`类别：事物     字数：7`}</div>
        <div className="word-container">
          {
            words.split('').map(item => {
              return (<div className="word-box">
                {item}
              </div>)
            })
          }
        </div>
        <Button onClick={() => {props.history.push('/result')}}>邀请</Button>
        <ScoreList res={arr} />
        <div className="tips">只有5-15人猜对答案才能获胜哦</div>
      </div>
    )
}

export default PlayView