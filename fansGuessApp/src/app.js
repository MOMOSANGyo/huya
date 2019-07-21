import React from 'react'
import { render } from 'react-dom'
import classnames from 'classnames'
import Avatar from './user/components/Avatar'
import MainView from './anchor/components/A1Main'
import LoadingView from './anchor/components/A2Loading'
import PrepareView from './anchor/components/A3Prepare'
import PlayView from './anchor/components/A4Play'
import 'antd/dist/antd.css'

import './user/assets/scss/common.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

render(
  (
    <Router>
      <Switch>
        <Route exact path="/" component={MainView} />
        <Route path="/loading" component={LoadingView} />
        <Route path="/prepare" component={PrepareView} />
        <Route path="/play" component={PlayView} />
      </Switch>
    </Router>
  ),
  document.getElementById('root')
)
