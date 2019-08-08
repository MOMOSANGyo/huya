import React, { Component } from 'react'

import Rule from '../../components/Rule/index'

import './success.scss'

class Success extends Component {
    render() {
        return (
            <div className="success">
                <div className="success_flex">
                <div>
                    <img className="success_title" src={require('./assets/title_one.png')} />
                </div>
                <div className="success_p">
                    <img className="success_tick suc_p" src={require('./assets/tick.png')} />
                    <p className="success_p1 suc_p">报名成功</p>
                    <p className="success_p2 suc_p">已有4人加入游戏，等待主播开局</p>
                </div>
                <Rule />
                </div>
                <div className="success_button">
                    <div className="success_btn_one" onClick={() =>{this.props.history.push('/loading')}}>分享给好友</div>
                    <div className="success_btn_two">暂时离开</div>
                </div>
            </div>
        )
    }
}

export default Success