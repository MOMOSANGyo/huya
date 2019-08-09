import React, { Component } from 'react'
import EndRank from '../../../common/EndRank/index'

import correct from './assets/true.png'
import mistake from './assets/false.png'
import './result.scss'

class ResultView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionNum:null,
            infomation: null,
            realanswer: null,
            score: null,
            rightNum:null,
            totalnum: null,
            wrongAnswer: null,
            right_rate: null,
            speed_rate: null,
            status: null,
            end: false,
            answerbool:1,
            success:false,
        }
        this.request = this.request.bind(this)
        this.end = this.end.bind(this)
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.request();
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    
    request(){
        hyExt.request({
            header: {
            },
            url: 'http://zaccc.lzok.top/user/public/',
            method: 'POST',
            dataType: 'json',
            data: {
                "gameid": global.info.gameid,
                "gamewordid": global.info.gamewordid
            }
        }).then(({ data, statusCode }) => {
            if (statusCode == 200) {
                if (data.questionNum === 10)
                {
                    this.setState({
                        end:true
                    })
                }
                if( data.status === 1)
                {
                    if (data.questionNum !== 10 ){
                        console.log(data);
                        console.log('---/playing---')
                        console.log('---/playing---')
                        console.log('---/playing---')
                        console.log('---/playing---')
                        this.props.history.push('/playing')
            }
        }
    
                console.log('---/resdata---')
                console.log('---/resdata---')
                console.log('---/resdata---')
                console.log('---/resdata---')
                this.setState({
                    questionNum: data.questionNum,
                    infomation: data.info,
                    realanswer: data.realanswer,
                    score: data.score, 
                    rightNum:data.rightNum,  
                    totalnum:data.totalnum,
                    wrongAnswer:data.wrongAnswer,
                    right_rate: data.right_rate, 
                    speed_rate: data.speed_rate,
                    status: data.status,
                    answerbool: data.answerbool,
                    success:true,
                })

                
            }
        }).catch(err => {
            hyExt.logger.warn('调用失败', err)
        })
    }

    end(){
        this.props.history.push('end')
    }
    render() {
        // let arr = [
        //     { url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
        //     score:'88',
        //     name: "clearlove",
        //      time: '1秒' },
        //     {
        //         url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
        //         score: '88',
        //         name: "clearlove",
        //         time: '1秒'
        //     },
        //     {
        //         url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
        //         score: '88',
        //         name: "clearlove",
        //         time: '1秒'
        //     },
        //     {
        //         url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
        //         score: '88',
        //         name: "clearlove",
        //         time: '1秒'
        //     },
        //     {
        //         url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
        //         score: '88',
        //         name: "clearlove",
        //         time: '1秒'
        //     }, {
        //         url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
        //         score: '88',
        //         name: "clearlove",
        //         time: '1秒'
        //     },
        //     {
        //         url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
        //         score: '88',
        //         name: "clearlove",
        //         time: '1秒'
        //     },
        //     {
        //         url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
        //         score: '88',
        //         name: "clearlove",
        //         time: '1秒'
        //     },
        //     {
        //         url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
        //         score: '88',
        //         name: "clearlove",
        //         time: '1秒'
        //     },
        // ]
        // let fRes = ['错误回答']
        return (
            <div className="result">
                {this.state.answerbool ?
                <div className="result_header">
                    <div className="result_header_index">第{this.state.questionNum}题</div>
                    <div className="result_header_tit">{this.state.realanswer}</div>
                </div>
                :
                <div className="result_header_f">
                    <div className="result_header1">
                        <div className="result_header_index">{this.state.questionNum}</div>
                        <div className="result_header_tit">{this.state.realanswer}</div>
                    </div>
                    <div className="result_header2">
                        <div className="result_header_index2">我的回答</div>
                        <div className="result_header_tit2">{this.state.wrongAnswer}</div>
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
                            <div ><span className="result_font">{this.state.right_rate}</span>对手</div>
                    </div>
                    <div className="result_res_one">
                        <div>累积得分</div>
                        <div ><span className="result_font">{this.state.score}</span>分</div>
                    </div>
                </div>
                :
                <div className="result_res">
                    <div className="result_res_one">
                        <div >手速击败</div>
                        <div className="result_font"><span>{this.state.speed_rate}</span>对手</div>
                    </div>
                    <div className="result_res_one">
                        <div>累积得分</div>
                        <div className="result_font"><span>{this.state.score}</span>分</div>
                    </div>
                </div>
                }
                <div className="result_footer">
                    
                    <div className="result_footer_endrank">
                        {this.state.success && <EndRank fRes={this.state.wrongAnswer} fNumber={7} res={this.state.infomation} number={this.state.end ? 6 :7 } />}
                    </div>
                    <div className="result_footer_one">共{this.state.totalnum}人参加游戏，{this.state.rightNum}人回答正确</div>
                </div>
                {this.state.end &&<div className="result_btn_one" onClick={this.end}>最终结果</div> }
            </div>
        )
    }
}

export default ResultView;