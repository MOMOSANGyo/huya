import React from 'react'
import { render } from 'react-dom'
import classnames from 'classnames'
import MainView from './components/A1Main'
import LoadingView from './components/A2Loading'
import PrepareView from './components/A3Prepare'
import PlayView from './components/A4Play'
import 'antd/dist/antd.css'
import './assets/scss/common.scss'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
console.log('=====22222222====')
class AnchorApp extends React.Component {
  render() {
    return(
      <Router>
        <Redirect from="/" to="main" />
        <Route path="/main" component={MainView} />
        <Route path="/loading" component={LoadingView} />
        <Route path="/prepare" component={PrepareView} />
        <Route path="/play" component={PlayView} />
      </Router>
    )
  }
}

export default AnchorApp;

