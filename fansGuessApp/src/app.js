import React from 'react'
import { render } from 'react-dom'



import FirstOne from './user/view/B0first/first'
import Home from './user/view/B1home/home'
import Success from './user/view/B2success/success'
import Loading from './user/view/B3loading/loading'
import Playing from './user/view/B4playing/playing'
import MidRes from './user/view/B5midres/midres'
import ResultView from './user/view/B6result/result';
import EndRes from './user/view/B7eres/eres'

import SuccessTwo from './user/view/B2successtwo/successtwo'

import 'antd/dist/antd.css'
import './user/assets/scss/common.scss'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import HomeTwo from './user/view/B1hometwo/hometwo';


render(
  (
    <Router>
      <Switch>
        <Route exact path="/" component={FirstOne} />
        <Route path="/home" component={Home} />
        <Route path="/home2" component={HomeTwo} />
        <Route path="/success" component={Success} />
        <Route path="/success2" component={SuccessTwo} />
        <Route path="/loading" component={Loading} />
        <Route path="/playing" component={Playing} />
        <Route path="/midres" component={MidRes} />
        <Route path="/res" component={ResultView}/>
        <Route path="/end" component={EndRes} />
      </Switch>
    </Router>
  ),
  document.getElementById('root')
)
