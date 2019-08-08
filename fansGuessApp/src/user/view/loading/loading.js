import React,{Component} from 'react'
import './loading.scss'
import TimeProgress from '../../../common/TimeProgress'


class LoadingView extends Component {
    constructor(props) {
        super(props);
        this.state ={
            count:0,
            category: '',
        }
        this.count = this.count.bind(this);
        this.next = this.next.bind(this);
    }
    componentWillMount(){
        this.next();
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.count();
        }, 1000);
        this.timerReq = setInterval(() => {
            this.next();
        }, 1000);
    }
    
    
    componentWillUnmount() {
        clearInterval(this.timer);
        clearInterval(this.timerReq);
    }
    
    count(){
        let count = this.state.count;
        count = count + 1;
        if(count === 60)
        {
            clearInterval(this.timer);
            clearInterval(this.timerReq);
            this.props.history.push('/playing')
        }
        this.setState({
            count:count,
            
        })
    }

    next(){
        hyExt.request({
            header: {
            },
            url: 'http://zaccc.lzok.top/user/waitword/',
            method: 'POST',
            dataType: 'json',
            data: {
                "gameid": global.info.gameid,

            }
        }).then((res) => {
            console.log('---loading---')
            console.log('---loading---')
            console.log('---loading---')
            console.log(res)
            this.setState({
                category: res.data.wordcategory
            })
            if(res.data.status === 1)
            {
                clearInterval(this.timer);
                clearInterval(this.timerReq);
                this.props.history.push('/playing')
            }
        }).catch(err => {
            hyExt.logger.warn('调用失败', err)
            console.log('---err--', err);
        });
    }
    render(){
    return (
        <div className="loading">
            <div className="loading_title">主播正在熟悉词语</div>
            <TimeProgress theme='purple' time={60}/>
            <div className="loading_content">词语类别：<span>{this.state.category}</span></div>
        </div>
    )
    }
}

export default LoadingView