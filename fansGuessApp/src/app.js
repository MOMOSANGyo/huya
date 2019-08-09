import React from 'react'
import { render } from 'react-dom'
import classnames from 'classnames'
import Avatar from './user/components/Avatar'

import FirstOne from './user/view/first/first'
import Home from './user/view/home/home'
import Success from './user/view/success/success'
import Loading from './user/view/loading/loading'
import Playing from './user/view/playing/playing'
import MidRes from './user/view/midres/midres'
import ResultView from './user/view/result/result';
import EndRes from './user/view/eres/eres'
import fRes from './user/view/fres/fres'
import SuccessTwo from './user/view/successtwo/successtwo'

import 'antd/dist/antd.css'
import './user/assets/scss/common.scss'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import HomeTwo from './user/view/hometwo/hometwo';


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
        <Route path="/fres" component={fRes} />
      </Switch>
    </Router>
  ),
  document.getElementById('root')
)
