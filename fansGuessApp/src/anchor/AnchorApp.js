import React from 'react'
import { render } from 'react-dom'
import classnames from 'classnames'
import MainView from './components/A1Main'
import LoadingView from './components/A2Loading'
import PrepareView from './components/A3Prepare'
import PlayView from './components/A4Play'
import ResultView from './components/A5Result'
import ScoreView from './components/A6Score'
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
        <Route path="/loading/:timebool/:gametime" component={LoadingView} />
        <Route path="/prepare/:gametime" component={PrepareView} />
        <Route path="/play/:gamewordtime" component={PlayView} />
        <Route path="/result" component={ResultView} />
        <Route path="/score" component={ScoreView} />
      </Router>
    )
  }
}

export default AnchorApp;

