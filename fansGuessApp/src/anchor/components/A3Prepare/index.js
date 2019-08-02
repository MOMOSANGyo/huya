import React from 'react'
import './index.scss'
import {Button} from 'antd'
import TimeProgress from '../../../common/TimeProgress'

const PrepareView = (props) => {

  const listdata = [
    "王者荣耀",
    "王者荣耀",
    "王者荣耀",
    "王者荣耀",
    "王者荣耀",
    "王者荣耀",
    "王者荣耀",
    "王者荣耀",
    "王者荣耀",
    "王者荣耀"
  ]

    return (
      <div className="a3-container">
        <div style={{ marginTop: 30}}>请在60秒时间内熟悉熟悉下列10个词语</div>
      	<TimeProgress theme='purple' style={{ marginTop: 30 }}/>
        <div className="prepare-words">
          <ul>
          {
            listdata.map((item, i) => {
              return <li className="detail-text">{item}</li>
            })
          }
          </ul>
        </div>
        <Button className="ok-btn" onClick={() => {props.history.push('/play')}}>准备好了</Button>
      </div>
    )
}

export default PrepareView