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
        hyExt.observer.on('invite', message => {
            console.log('=========收到小程序后台推送过来的消息==========', message);
          })
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
            dataType: 'Text',
            data: {

            }
        }).then((res) => {
            console.log('--data--', res);
            global.info.gameid = res.data.gameid;
            if (res.data.time) {
                if (res.data.time !== "0") {
                    this.props.history.push('/home2')
                } else {
                    this.props.history.push('/home')
                }
                
            }
        }).catch(err => {
            hyExt.logger.warn('调用失败', err)
            console.log('---err--', err);
        });

    }




    render() {

        return (
            <div className="first">
                <div></div>
                <img className="first_title" src={require('../../assets/images/b1_title.png')} />
                <div className="first_p">
                    <p className="first_p1">主播还未发出游戏邀请，期待一下吧</p>
                </div>
                <div className="first_rule">
                    <Rule />
                </div>
                <div style={{ height: 44, marginBottom: 8 }}></div>
            </div>
        )
    }
}

export default withRouter(First)