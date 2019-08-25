import React, { Component } from 'react'

import Rule from '../../components/Rule/index'

import './success.scss'

class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            time: 0,
            success: false,
            status: null
        }
        this.init = this.init.bind(this);
        // this.showModal = this.showModal.bind(this)
        // this.hideModal = this.hideModal.bind(this)
    }


    componentDidMount() {
        this.timer = setInterval(() => {
            this.init();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    init() {
        console.log(global.info.gameid);
        hyExt.request({
            header: {
            },
            url: 'http://zaccc.lzok.top/user/wait/',
            method: 'POST',
            dataType: 'json',
            data: {
                "gameid": global.info.gameid
            }
        }).then((res) => {
            console.log('--data--', res);
            this.setState({
                num: res.data.num,
                time: res.data.time,
                success: true,
                status: res.data.status
            })
            // this.props.history.push('/playing')
            if (res.data.status === 2) {
                clearInterval(this.timer);
                hyExt.context.showToast('抱歉，游戏人数不足，暂时无法开局').then(() => {
                    hyExt.logger.info('显示成功')
                }).catch(err => {
                    hyExt.logger.warn('显示失败', err)
                })
            } else if (res.data.status === 3) {
                clearInterval(this.timer);
                this.props.history.push('loading')
            }

        }).catch(err => {
            hyExt.logger.warn('调用失败', err)
            console.log('---err--', err);
        });
    }
    render() {
        return (
            <div className="success">
                    <div></div>
                    <div>
                        <img className="success_title" src={require('../../assets/images/b1_title.png')} />
                    </div>
                    <div className="success_p">
                        <img className="success_tick suc_p" src={require('./assets/tick.png')} />
                        <p className="success_p1 suc_p">报名成功</p>
                        <p className="success_p2 suc_p"><span className="success_p2_time">已有{this.state.num}人加入游戏，等待主播开局</span></p>
                    </div>
                    <Rule />
                {/* <div className="success_button">
                    <div className="success_btn_one" >分享给好友</div>
                    <div className="success_btn_two">暂时离开</div>
                </div> */}
                    <div></div>
            </div>
        )
    }
}

export default Success