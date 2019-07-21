import React from 'react'
import './index.scss'
import {Button} from 'antd'

const PlayView = (props) => {
    return (
      <div className="a1-container">
      	<img src={require("./icon.png")}></img>
        <div>Main</div>
        <Button onClick={() => {props.location.push('/loading')}}>邀请</Button>
      </div>
    )
}

export default PlayView