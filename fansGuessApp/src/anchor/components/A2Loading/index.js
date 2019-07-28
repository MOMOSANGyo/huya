import React from 'react'
import './index.scss'
import {Button} from 'antd'

const LoadingView = (props) => {
    return (
      <div className="a2-container">
      	<img src={require("./icon.png")}></img>
        <div>Loading</div>
        <Button onClick={() => {props.location.push('/loading')}}>邀请</Button>
      </div>
    )
}

export default LoadingView