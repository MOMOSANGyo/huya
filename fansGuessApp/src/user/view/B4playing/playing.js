import '../config.js'
import React, {Component} from 'react'
import TimeProgress from '../../../common/TimeProgress'
import Input from '../../../common/Input/index'
import './playing.scss'
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

class Playing extends Component{
    constructor(props) {
        super(props);
        this.state = {
            questionNum: 0,
            category: '',
            len: 0,
            count:0,
            answer:[],
            time:60,
            input:false,
        }
        this.count = this.count.bind(this);
        this.submit = this.submit.bind(this);
    }
    
    componentWillMount() {
        hyExt.request({
            header: {
            },
            url: 'http://zaccc.lzok.top/newuser/question/',
            method: 'POST',
            dataType: 'json',
            data: {
                "gameid": global.info.gameid
            }
        }).then(({ data, statusCode }) => {
            console.log('----B4answer----')
            console.log(data)
            console.log('statusCode')
            console.log(statusCode)

            if (statusCode == 200) {
                console.log('---200--')
                //通过正确答案渲染输入框个数
                let answer = [];
                for (let i = 0; i < data.len; i++) {
                    answer.push('');
                }
                console.log('---answer--')
                console.log(answer);
                this.setState({
                    questionNum: data.questionNum,
                    category: data.category,
                    len: data.len,
                    answer:answer,
                    time: parseInt(data.time),
                    input:true,
                })
                global.info.gamewordid = data.gamewordid;
                global.info.questionNum = data.questionNum;
            }
        }).catch(err => {
            console.log('----answer----')
            console.log('----answer----')
            console.log('----answer----')
            console.log('----answer----')
            console.log(err)
            hyExt.logger.warn('调用失败', err)
        })
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.count();
        }, 1000);
    }
    
    count() {
        let count = this.state.count;
        count = count + 1;
        if (count === this.state.time) {
            var answer = '';
            for (let i = 0; i < this.state.len; i++) {
                let item = document.getElementById(i).value
                answer = answer + item;
            }
            var b = answer.toUpperCase();
            console.log(answer)
            hyExt.request({
                header: {
                },
                url: 'http://zaccc.lzok.top/newuser/answer/',
                method: 'POST',
                dataType: 'json',
                data: {
                    "gameid": global.info.gameid,
                    "gamewordid":global.info.gamewordid,
                    "answer":b,
                    "time": this.state.count,
                }
            }).then(({ data, statusCode }) => {
                clearInterval(this.timer);
                console.log('this.state.count')
                global.info.remaintime = this.state.time - this.state.count
                let length = []
                for (let i = 0; i < data.len; i++) {
                    length.push('')
                }
                if (statusCode == 200) {
                    this.setState({
                        questionNum: data.questionNum,
                        category: data.category,
                        len: data.len,
                        answer:length
                    })
                    this.props.history.push('/res')
                }
            }).catch(err => {
                clearInterval(this.timer);
                hyExt.logger.warn('调用失败', err)
            })
        }
        this.setState({
            count: count
        })
    }
    submit(){
        var answer = '';
        for (let i = 0; i < this.state.len; i++) {
            let item = document.getElementById(i).value
            answer = answer + item;
        }
        var b = answer.toUpperCase();
        console.log(answer)
        hyExt.request({
            header: {
            },
            url: 'http://zaccc.lzok.top/newuser/answer/',
            method: 'POST',
            dataType: 'json',
            data: {
                "gameid": global.info.gameid,
                "gamewordid":global.info.gamewordid,
                "answer":b,
                "time": this.state.count,
            }
        }).then(({ data, statusCode }) => {
            clearInterval(this.timer);
            console.log('this.state.count')
            global.info.remaintime = this.state.time - this.state.count
            let length = []
            for (let i = 0; i < data.len; i++) {
                length.push('')
            }
            if (statusCode == 200) {
                this.setState({
                    questionNum: data.questionNum,
                    category: data.category,
                    len: data.len,
                    answer:length
                })
                this.props.history.push('/midres')
            }
        }).catch(err => {
            clearInterval(this.timer);
            hyExt.logger.warn('调用失败', err)
        })
       
        
    }
    render(){
        
        return(
            <div className="playing" style={{ backgroundImage: `url(${gameBg[this.state.questionNum]})` }}>
                <div className="playing_header">
                    <div className="playing_tit">{numberText[this.state.questionNum]}</div>
                <TimeProgress theme='black' time={this.state.time}/>
                </div>
                <div className="playing_content">
                    <div className="playing_con">
                    <div className="playing_con_one">
                        <span className="playing_span1">类别：{this.state.category}</span><span>字数：{this.state.len}</span>
                    </div>
                    
                    <div>
                        {this.state.input && <Input answer={this.state.answer} /> }
                    </div>

                    </div>
                </div>
                <div className="playing_footer">
                    <div className="playing_btn" onClick={this.submit}>提交答案</div>
                </div>
            </div>
        )
    }
}


export default Playing