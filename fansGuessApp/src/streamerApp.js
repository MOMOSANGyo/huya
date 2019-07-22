import React from 'react'
import { render } from 'react-dom'
import classnames from 'classnames'
import MainView from './anchor/components/A1Main'
import LoadingView from './anchor/components/A2Loading'
import PrepareView from './anchor/components/A3Prepare'
import PlayView from './anchor/components/A4Play'
import 'antd/dist/antd.css'
import './user/assets/scss/common.scss'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
console.log('=====22222222====')
render(
  (
    <Router>
        <Redirect from="/" to="main" />
        <Route path="/main" component={MainView} />
        <Route path="/loading" component={LoadingView} />
        <Route path="/prepare" component={PrepareView} />
        <Route path="/play" component={PlayView} />
    </Router>
  ),
  document.getElementById('aroot')
)