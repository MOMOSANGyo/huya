import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {Modal} from 'antd'
import Rule from '../../components/Rule/index'
import CountDown from '../../components/CountDown/index'
import './hometwo.scss'

class HomeTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            time:0,
            success:false,
        }
        this.join = this.join.bind(this);
        // this.init = this.init.bind(this);
        // this.showModal = this.showModal.bind(this)
        // this.hideModal = this.hideModal.bind(this)
    }

    
    componentDidMount() {
        // this.init();
        hyExt.observer.on('waitNum', message => {
            console.log('=========收到小程序后台推送过来的消息==========', message);
            const data = JSON.parse(message);
            
            console.log('=====message====personnum==timebool===', data.personnum, data.timebool);
            if(data.timebool != 1){
                const nowtime = +new Date();

                this.setState({
                    time: data.time-nowtime,
                    success: true
                })
            }
            this.setState({
                    count: data.personnum
            })
        })
    }
   
    // init(){
    //     console.log(global.info.gameid);
    //     hyExt.request({
    //         header: {
    //         },
    //         url: 'http://zaccc.lzok.top/user/invite/',
    //         method: 'POST',
    //         dataType: 'json',
    //         data: {
    //             "gameid": global.info.gameid
    //         }
    //     }).then((res) => {
    //         console.log('--data--', res);
    //         this.setState({
    //             count:res.data.num,
    //             time:res.data.time,
    //             success:true
    //         })
    //         // this.props.history.push('/playing')
    //         console.log('--data--',this.state.time);
            
    //     }).catch(err => {
    //         hyExt.logger.warn('调用失败', err)
    //         console.log('---err--', err);
    //     });
    // }

   

    
    //发送请求
    join() {
        hyExt.context.getUserInfo().then(userInfo => {
            hyExt.request({
                header: {
                },
                url: 'http://zaccc.lzok.top/newuser/join/',
                method: 'POST',
                dataType: 'json',
                data: {
                    "gameid": global.info.gameid,
                    'name': userInfo.userNick,
                    'picture': userInfo.userAvatarUrl
                }
            }).then((res) => {
                hyExt.logger.info('调用成功', res);
                this.props.history.push('/success2')
            }).catch(err => {
                hyExt.context.showToast('获取用户信息失败').then(() => {
                    hyExt.logger.info('显示成功')
                }).catch(err => {
                    hyExt.logger.warn('显示失败', err)
                })
                console.log('---err--', err);
            });
        }).catch(err => {
            hyExt.logger.warn('获取用户信息失败', err)
        })
        

    }
    render() {
        return (
            <div className="hometwo">
                <div></div>
                <img className="hometwo_title" src={require('../../assets/images/b1_title.png')} />
                <div className="hometwo_p">
                    <p className="hometwo_p1">主播正在邀请你参加猜词游戏</p>
                    <p className="hometwo_P2"><span className="hometwo_time">距离游戏开始还有 </span>
                    {this.state.success ? <CountDown time={this.state.time} /> : <span >00:00</span> }</p>
                    <p className="hometwo_p2">已有 {this.state.count} 人加入游戏，快来参加</p>
                </div>
                <Rule />
                {/* <Modal
                    title="Modal"
                    visible={true}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>Bla bla ...</p>
                    <p>Bla bla ...</p>
                    <p>Bla bla ...</p>
                </Modal> */}
                <div className="btn_one" onClick={this.join}>立即参加</div>
            </div>
        )
    }
}

export default withRouter(HomeTwo)