import '../config'
import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Rule from '../../components/Rule/index'
import './first.scss'

class First extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
        this.sendData = this.sendData.bind(this)
    }

    
    componentDidMount() {
     this.timer = setInterval(() => {
        this.sendData();
    }, 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    

    //发送请求
    sendData() {
        hyExt.request({
            header: {
            },
            url: 'http://zaccc.lzok.top/user/index/',
            method: 'POST',
            dataType: 'json',
            data: {
               
            }
        }).then((res) => {
            hyExt.logger.info('调用成功', res);
            global.info.gameid = res.data.gameid;
            if(res.data.time)
            {
                this.props.history.push('/home2')
            }else{
                this.props.history.push('/home')
            }
            
            console.log('--data--', res);
        }).catch(err => {
            hyExt.logger.warn('调用失败', err)
            console.log('---err--', err);
        });

    }
    render() {
        
        return (
            <div className="first">
                <img className="first_title" src={require('./title_one.png')} />
                <div className="first_p">
                    <p className="first_p1">主播还未发出游戏邀请，期待一下吧</p>
                </div>
                <div className="first_rule">
                <Rule />
                </div>
            </div>
        )
    }
}

export default withRouter(First)