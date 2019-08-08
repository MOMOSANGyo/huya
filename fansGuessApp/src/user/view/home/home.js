import React,{Component} from 'react'
import { withRouter } from "react-router-dom";

import Rule from '../../components/Rule/index'
import './home.scss'

class Home extends Component{
    constructor(props) {
        super(props);
        this.state ={
            count: 0,
        }
        this.sendData = this.sendData.bind(this)
    }

 
    //发送请求
    sendData(){
        console.log(global.info.gameid);
        hyExt.request({
            header: {
            },
            url: 'http://zaccc.lzok.top/user/invite/',
            method: 'POST',
            dataType: 'json',
            data: {
                "gameid": global.info.gameid
            }
        }).then((res) => {
            hyExt.logger.info('调用成功', res);
            this.props.history.push('/success')
            console.log('--data--', res);
        }).catch(err => {
            hyExt.logger.warn('调用失败', err)
            console.log('---err--', err);
        });

    }
    render() {
        let props = this.props;
        console.log(props);
        return(
            <div className="home">
                <div className="home_flex">
                <img className="home_title" src={require('./title_one.png')}/> 
                <div className="home_p">
                <p className="home_p1">主播正在邀请你参加猜词游戏</p>
                <p className="home_p2">已有{this.state.count}人加入游戏，快来参加</p>
                </div>
                <Rule />
                </div>
                <div className="btn_one" onClick={this.sendData}>立即参加</div>
            </div>
        )
    }
}

export default withRouter(Home)