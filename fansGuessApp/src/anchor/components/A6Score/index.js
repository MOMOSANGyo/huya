import React from 'react'
import './index.scss'
import {Button} from 'antd'

const ScoreView = (props) => {
    return (
      <div className="a1-container">
      	
        <div>Main</div>
        <Button onClick={() => {props.history.push('/loading')}}>邀请</Button>
      </div>
    )
}

export default ScoreView