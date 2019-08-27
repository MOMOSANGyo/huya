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
        // this.count = this.count.bind(this);
        this.next = this.next.bind(this);
    }
    // componentWillMount(){
    //     this.next();
    // }

    componentDidMount() {
        this.next();
        hyExt.observer.on('begin', message => {
            console.log('=========收到小程序后台推送过来的消息==========', message);
            const data = JSON.parse(message);
            global.info.gameid = data.gameid;
            if (data.begin == 1) {
                this.props.history.push('/playing');
            }
        })
    }
    
    
    componentWillUnmount() {
        // clearInterval(this.timer);
        // clearInterval(this.timerReq);
    }
    
    // count(){
    //     let count = this.state.count;
    //     count = count + 1;
    //     if(count === 60)
    //     {
    //         clearInterval(this.timer);
            
    //         // this.props.history.push('/playing')
    //     }
    //     this.setState({
    //         count:count,
            
    //     })
    // }

    wait(){
        hyExt.request({
            header: {
            },
            url: 'http://zaccc.lzok.top/newuser/wait/',
            method: 'POST',
            dataType: 'json',
            data: {
                "gameid": global.info.gameid,

            }
        }).then((res) => {
            console.log('---loading---')
            console.log(res)
            this.setState({
                category: res.data.wordcategory
            })
        }).catch(err => {
            hyExt.logger.warn('调用失败', err)
            console.log('---err--', err);
        });
    }
    render(){
    return (
        <div className="loading">
            <div className="loading-container">
                <div className="loading_title">主播正在熟悉词语</div>
                <TimeProgress theme='purple' left="user" time={60}/>
                <div className="loading_content">词语类别：<span>{this.state.category}</span></div>
            </div>
        </div>
    )
    }
}

export default LoadingView