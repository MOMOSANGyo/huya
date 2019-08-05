import React from 'react'
import './index.scss'
import {Button} from 'antd'
import RankList from '../RankList';
let arr = [
  {
    url: "./icon.png",
    name: "user",
    score: "8分",
    time: "4秒"
  },
  {
    url: "./icon.png",
    name: "user",
    score: "8分",
    time: "5秒"
  },
  {
    url: "./icon.png",
    name: "user",
    score: "8分",
    time: "8秒"
  },
  {
    url: "./icon.png",
    name: "user",
    score: "8分",
    time: "3秒"
  }
];

const ScoreView = (props) => {
    return (
      <div className="a1-container">
      	<RankList res={arr} />
        <div>Main</div>
        <Button onClick={() => {props.history.push('/loading')}}>邀请</Button>
      </div>
    )
}

export default ScoreView