import React,{Component} from 'react'
import { withRouter } from "react-router-dom";

import Rule from '../../components/Rule/index'
import './home.scss'

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            time: 0,
            success: false,
        }
        this.join = this.join.bind(this);
        this.init = this.init.bind(this);
        // this.showModal = this.showModal.bind(this)
        // this.hideModal = this.hideModal.bind(this)
    }


    componentDidMount() {
        this.init();
    }
    
    init() {
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
            console.log('--data--', res);
            this.setState({
                count: res.data.num,
                time: res.data.time,
                success: true
            })
            // this.props.history.push('/playing')
            console.log('--data--', this.state.time);

        }).catch(err => {
            hyExt.logger.warn('调用失败', err)
            console.log('---err--', err);
        });
    }


    //发送请求
    join() {
        hyExt.context.getUserInfo().then(userInfo => {
            hyExt.request({
                header: {
                },
                url: 'http://zaccc.lzok.top/user/join/',
                method: 'POST',
                dataType: 'json',
                data: {
                    "gameid": global.info.gameid,
                    'name': userInfo.userNick,
                    'picture': userInfo.userAvatarUrl
                }
            }).then((res) => {
                hyExt.logger.info('调用成功', res);
                this.props.history.push('/success')
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
        let props = this.props;
        console.log(props);
        return(
            <div className="home">
                <div></div>
                <img className="home_title" src={require('../../assets/images/b1_title.png')}/> 
                <div className="home_p">
                <p className="home_p1">主播正在邀请你参加猜词游戏</p>
                <p className="home_p2">已有 {this.state.count} 人加入游戏，快来参加</p>
                </div>
                <Rule />
                <div className="btn_one" onClick={this.join}>立即参加</div>
            </div>
        )
    }
}

export default withRouter(Home)