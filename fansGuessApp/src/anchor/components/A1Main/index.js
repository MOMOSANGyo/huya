import React from 'react'
import './index.scss'
import {Button} from 'antd'

const MainView = (props) => {
  console.log('==========Main=============',props);
    return (
      <div className="a1-container">
      	<img src={require("./icon.png")}></img>
        <div>Main</div>
        <Button onClick={() => {props.history.push('/loading')}}>邀请</Button>
      </div>
    )
}

export default MainView