import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import TimeProgress from '../../../common/TimeProgress'
import Input from '../../../common/Input/index'
import './midres.scss'
import Rank from '../../../common/rank';

//样式大部分可以与playing页面公用
class MidRes extends Component{
    constructor(props) {
        super(props);
        this.state={
            questionNum: null,
            answer: '',
            infomation: [],
            num:0,
            totalnum:0,
            count:global.info.remaintime,
            input:false,
        }
    }
    
    componentWillMount() {
        hyExt.request({
            header: {
            },
            url: 'http://zaccc.lzok.top/user/displayanswer/',
            method: 'POST',
            dataType: 'json',
            data: {
                "gameid": global.info.gameid,
                "gamewordid":global.info.gamewordid
            }
        }).then(({ data, statusCode }) => {
            console.log('----data----')
            console.log('----data----')
            console.log('----data----')
            console.log('----data----')
            console.log(data)

            if (statusCode == 200) {
                let answer = [...data.answer]
                this.setState({
                    questionNum: data.questionNum,
                    answer: answer,
                    infomation:data.infomation,
                    num: data.num,
                    totalnum:data.totalnum,
                    input:true, 
                })
            }
            
        }).catch(err => {
            hyExt.logger.warn('调用失败', err)
        })
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.count();
        }, 1000);
    }
    
      count(){
        let count = this.state.count;
        count = count - 1;
        if(count === 0)
        {
            clearInterval(this.timer);
            this.props.history.push('/res')
        }
        this.setState({
            count:count
        })
    }
    render(){
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
        return(
            <div className="midres">
                <div className="midres_header">
                    <div className="midres_tit">第{this.state.questionNum}题</div>
                    <TimeProgress theme='black' time={global.info.remaintime}/>
                </div>
                <div className="midres_content">
                    <div className="midres_con">
                    <div className="midres_con_one">
                        <span className="midres_span1">我的答案</span>
                    </div>
                    <div className="midres_input">
                        {this.state.input && <Input answer={this.state.answer} />}
                    </div>
                    </div>
                </div>
                <div className="midres_footer">
                    {this.state.input && 
                    <Rank res={this.state.infomation} 
                          totalnum={this.state.totalnum}
                          num={this.state.num}
                    />}
                </div>
            </div>
        )
    }
}

export default MidRes