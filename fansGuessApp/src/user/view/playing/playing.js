import '../config.js'
import React, {Component} from 'react'
import TimeProgress from '../../../common/TimeProgress'
import Input from '../../../common/Input/index'
import './playing.scss'


class Playing extends Component{
    constructor(props) {
        super(props);
        this.state = {
            questionNum: 0,
            category: '',
            len: 0,
            count:0,
            answer:[],
            input:false,
        }
        this.count = this.count.bind(this);
        this.submit = this.submit.bind(this);
    }
    
    componentWillMount() {
        hyExt.request({
            header: {
            },
            url: 'http://zaccc.lzok.top/user/answer/',
            method: 'POST',
            dataType: 'json',
            data: {
                "gameid": global.info.gameid
            }
        }).then(({ data, statusCode }) => {
            console.log('----answer----')
            console.log('----answer----')
            console.log('----answer----')
            console.log('----answer----')
            console.log(data)
            console.log('statusCode')
            console.log(statusCode)

            if (statusCode == 200) {
                console.log('---200--')
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
                    input:true,
                })
                global.info.gamewordid = data.gamewordid
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
        if (count === 60) {
            clearInterval(this.timer);
            this.submit();
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
        console.log(answer)
        hyExt.request({
            header: {
            },
            url: 'http://zaccc.lzok.top/user/push/',
            method: 'POST',
            dataType: 'json',
            data: {
                "gameid": global.info.gameid,
                "gamewordid":global.info.gamewordid,
                "answer":answer,
                "time": this.state.count,
            }
        }).then(({ data, statusCode }) => {
            clearInterval(this.timer);
            console.log('this.state.count')
            global.info.remaintime = 60 - this.state.count
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
            <div className="playing">
                <div className="playing_header">
                <div className="playing_tit">第{this.state.questionNum}题</div>
                <TimeProgress theme='black' time={60}/>
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