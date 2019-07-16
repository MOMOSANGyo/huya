
import React from 'react'
import { render } from 'react-dom'
import classnames from 'classnames'
import Avatar from './anchor/components/Avatar'
import './anchor/assets/scss/common.scss'

let isDemo = true;

render(
  <div className={classnames({'demo': isDemo})}>
  	<Avatar/>
  	<h1>Welcome to Your React.js Ext App</h1>
  	<h2>Streamer side</h2>
  </div>,
  document.getElementById('aroot')
)
