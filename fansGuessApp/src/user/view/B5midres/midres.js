import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Spin, message } from 'antd'
import TimeProgress from '../../../common/TimeProgress'
import Input from '../../../common/Input/index'
import './midres.scss'
import '../../assets/scss/loading.scss'
import Rank from '../../../common/rank';
import { gameBg } from '../../assets/imgConfig'

const numberText = [
    '第一题',
    '第二题',
    '第三题',
    '第四题',
    '第五题',
    '第六题',
    '第七题',
    '第八题',
    '第九题',
    '第十题',
]
class MidRes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionNum: null,
            answer: '',
            infomation: [],
            num: 0,
            totalnum: 0,
            count: global.info.remaintime,
            input: false,
            loading: true,
        }
        this.getResult = this.getResult.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.getResult();
        this.timer = setInterval(() => {
            this.count();
        }, 1000);
        hyExt.observer.on('userList', message => {
            console.log('=========收到小程序后台推送过来的消息==========' + message);
            const data = JSON.parse(message);
            this.setState({
                infomation: data.userlist,
                num: data.num
            })
        })

    }

    count() {
        let count = this.state.count;
        count = count - 1;
        if (count === 0) {
            clearInterval(this.timer);
            this.props.history.push('/res')
        }
        this.setState({
            count: count
        })
    }

    getResult() {
        hyExt.request({
            header: {
            },
            url: 'http://zaccc.lzok.top/newuser/waitnext/',
            method: 'POST',
            dataType: 'json',
            data: {
                "gameid": global.info.gameid,
                "gamewordid": global.info.gamewordid
            }
        }).then(({ data, statusCode }) => {
            console.log('----B5data----')
            console.log('----B5data----')
            console.log('----B5data----')
            console.log('----B5data----')
            console.log(data)

            if (statusCode == 200) {
                let answer = [...data.answer]
                global.info.myanswer = data.answer;
                this.setState({
                    questionNum: data.questionNum,
                    answer: answer,
                    totalnum: data.totalperson,
                    input: true,
                    loading: false,
                })
            }else{
                message.error(`接口错误,${statusCode}`);
                this.setState({
                    loading: false,
                })
            }

        }).catch(err => {
            message.error(err);
            hyExt.logger.warn('调用失败', err)
        })
    }
    render() {
        // let info = [
        //     {
        //         'username': "haha", 
        //     'time': 6, 
        //     'useranswer': "西红柿炒蛋"
        //     },
        //     {
        //         'username': "jiejie",
        //         'time': 9,
        //         'useranswer': "妲己陪你玩"
        //     },
        //     {
        //         'username': "yiyi",
        //         'time': 11,
        //         'useranswer': "满血把你送回家"
        //     },
        //     {
        //         'username': "haha",
        //         'time': 6,
        //         'useranswer': "西红柿炒蛋"
        //     },
        //     {
        //         'username': "jiejie",
        //         'time': 9,
        //         'useranswer': "妲己陪你玩"
        //     },
        //     {
        //         'username': "yiyi",
        //         'time': 11,
        //         'useranswer': "满血把你送回家"
        //     },
        //     {
        //         'username': "haha",
        //         'time': 6,
        //         'useranswer': "西红柿炒蛋"
        //     },
        //     {
        //         'username': "jiejie",
        //         'time': 9,
        //         'useranswer': "妲己陪你玩"
        //     },
        //     {
        //         'username': "yiyi",
        //         'time': 11,
        //         'useranswer': "满血把你送回家"
        //     }
        // ]
        console.log('global.info.remaintime');
        console.log(global.info.remaintime);

        if (this.state.loading) {
            return (
                <div className="loading"
                    style={{ backgroundImage: `url(${gameBg[global.info.questionNum]})` }}
                >
                    <Spin tip="loading" />
                </div>
            )
        } else {
            return (
                <div className="midres" style={{
                    backgroundImage: `url(${gameBg[this.state.questionNum]})`
                }}>
                    <div className="midres_header">
                        <div className="midres_tit">{numberText[this.state.questionNum]}</div>
                        <TimeProgress theme='black' time={global.info.remaintime} />
                    </div>
                    <div className="midres_content">
                        <div className="midres_con">
                            <div className="midres_con_one">
                                <span className="midres_span1">我的答案</span>
                            </div>
                            <div className="midres_input">
                                <Input answer={this.state.answer} disabled={true}/>
                            </div>
                        </div>
                    </div>
                    <div className="midres_footer">

                        <Rank res={this.state.infomation}
                            totalnum={this.state.totalnum}
                            num={this.state.num}
                        />
                    </div>
                </div>
            )
        }
    }
}

export default MidRes