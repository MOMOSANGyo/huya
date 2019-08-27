import React, { Component } from 'react'
import EndRank from '../../../common/EndRank/index'
import {Spin} from 'antd'
import correct from './assets/true.png'
import mistake from './assets/false.png'
import './result.scss'
import '../../assets/scss/loading.scss'
import '../config'
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
class ResultView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionNum: null,
            infomation: null,
            realanswer: null,
            score: null,
            rightNum: null,
            totalnum: null,
            wrongAnswer: null,
            right_rate: null,
            speed_rate: null,
            status: null,
            end: false,
            answerbool: 1,
            loading:true,
        }
        this.request = this.request.bind(this)
        this.end = this.end.bind(this)
    }

    componentDidMount() {

        this.request();
        hyExt.observer.on('nextQuestion', message => {
            console.log('=========收到小程序后台推送过来的消息==========', message);
            const data = JSON.parse(message);
            if (data.wordnum <= 8) {
                console.log(data);
                console.log('---/playing---')
                this.props.history.push('/playing')
            } else if (data.wordnum === 9) {
                this.props.history.push('/end');
            }
        })

    }
    componentWillUnmount() {
        // clearInterval(this.timer)
    }

    request() {
        hyExt.request({
            header: {
            },
            url: 'http://zaccc.lzok.top/newuser/display/',
            method: 'POST',
            dataType: 'json',
            data: {
                "gameid": global.info.gameid,
                "gamewordid": global.info.gamewordid
            }
        }).then(({ data, statusCode }) => {
            console.log('---/resdata---')
            console.log('---/resdata---')
            console.log('---/resdata---')
            console.log('---/resdata---')
            console.log(data);
            if (statusCode == 200) {
                if (data.questionNum === 9) {
                    this.setState({
                        end: true
                    })
                }
                // if (data.status === 1) {
                //     if (data.questionNum <= 8) {
                //         console.log(data);
                //         console.log('---/playing---')
                //         console.log('---/playing---')
                //         console.log('---/playing---')
                //         console.log('---/playing---')
                //         this.props.history.push('/playing')
                //     } else if (data.questionNum === 9) {
                //         this.props.history.push('/end');
                //     }
                // }


                this.setState({
                    questionNum: data.questionNum,
                    infomation: data.info,
                    realanswer: data.realanswer,
                    score: data.score,
                    rightNum: data.rightNum,
                    totalnum: data.totalnum,
                    wrongAnswer: data.wrongAnswer,
                    right_rate: data.right_rate,
                    speed_rate: data.speed_rate,
                    status: data.status,
                    answerbool: data.answerbool,
                    loading:false,
                })


            }
        }).catch(err => {
            console.log(err);
        })
    }

    end() {
        this.props.history.push('end')
    }
    render() {
        console.log('------global.info.myanswer----')
        console.log('------global.info.myanswer----')

        console.log('------global.info.myanswer----')
        console.log('------global.info.myanswer----')
        console.log(global.info.myanswer)
        if (this.state.loading) {
            return(
                <div className="loading" 
                style={{ backgroundImage: `url(${gameBg[global.info.questionNum]})` }}
                >
                    <Spin tip="loading"/>
                </div>
            )
        } else {
            return (
                <div className="result"
                    style={{ backgroundImage: `url(${gameBg[this.state.questionNum]})` }}>
                    {this.state.answerbool ?
                        <div className="result_header">
                            <div className="result_header_index">{numberText[this.state.questionNum]}</div>
                            <div className="result_header_tit">{this.state.realanswer}</div>
                        </div>
                        :
                        <div className="result_header_f">
                            <div className="result_header1">
                                <div className="result_header_index">{numberText[this.state.questionNum]}</div>
                                <div className="result_header_tit">{this.state.realanswer}</div>
                            </div>
                            <div className="result_header2">
                                <div className="result_header_index2">我猜的</div>
                                <div className="result_header_tit2">{global.info.myanswer}</div>
                            </div>
                        </div>
                    }
                    {this.state.answerbool ?
                        <div>
                            <img className="result_img" src={this.state.answerbool ? correct : mistake} />
                            <div className="result_correct">回答正确</div>
                        </div>
                        :
                        <div>
                            <img className="result_img" src={mistake} />
                            <div className="result_correct">猜错了</div>
                        </div>
                    }
                    {this.state.answerbool ?
                        <div className="result_res">
                            <div className="result_res_one">
                                <div >击败</div>
                                <div ><span className="result_font">{this.state.right_rate}</span> 对手</div>
                            </div>
                            <div className="result_res_one">
                                <div>累积得分</div>
                                <div ><span className="result_font">{this.state.score}</span> 分</div>
                            </div>
                        </div>
                        :
                        <div className="result_res">
                            <div className="result_res_one">
                                <div >手速击败</div>
                                <div className="result_font"><span>{this.state.speed_rate}</span> 对手</div>
                            </div>
                            <div className="result_res_one">
                                <div>累积得分</div>
                                <div className="result_font"><span>{this.state.score}</span> 分</div>
                            </div>
                        </div>
                    }
                    <div className="result_footer">

                        <div className="result_footer_endrank">
                                <EndRank
                                    
                                    fRes={this.state.wrongAnswer}
                                    fNumber={7}
                                    res={this.state.infomation}
                                    number={this.state.end ? 6 : 7}
                                    myanswer={global.info.myanswer} />
                        </div>
                        <div className="result_footer_one">共{this.state.totalnum}人参加游戏，{this.state.rightNum}人回答正确</div>
                    </div>
                    {this.state.end && <div className="result_btn_one" onClick={this.end}>最终结果</div>}
                </div>
            )
        }
    }
}

export default ResultView;