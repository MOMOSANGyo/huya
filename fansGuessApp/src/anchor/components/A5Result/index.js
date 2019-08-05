import React from 'react'
import './index.scss'
import {Button} from 'antd'
import ResultProgress from '../ResultProgerss'
import EndRank from '../../../common/EndRank'

let arr = [
  {
    url: "./icon.png",
    name: "user",
    time: "1秒"
  }
];

let fRes = [
  '错误回答',
  '全职高手'
]

const ResultView = (props) => {
    return (
      <div className="a5-container">
        <div className="question-header">
          <span className="h-number">第一题</span>
          <span className="h-text">奥尔良烤鸡翅</span>
        </div>
      	<ResultProgress style={{ marginTop: 8 }} rightPeople={13} totle={20} />
          <EndRank res={arr} fRes={fRes} number={3} fNumber={2} />
        <Button className="next-btn" onClick={() => {props.history.push('/score')}}>下一题</Button>
      
      </div>
    )
}

export default ResultView