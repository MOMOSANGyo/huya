import React from 'react'
import './index.scss'
import {Button} from 'antd'
import TimeProgress from '../../../common/TimeProgress'

const PlayView = (props) => {
    return (
      <div className="a4-container">
      	<TimeProgress theme="black" style={{marginTop: 40}} />
        <div>Main</div>
        <Button onClick={() => {props.history.push('/loading')}}>邀请</Button>
      </div>
    )
}

export default PlayView