import '../config'
import React,{Component} from 'react';
import ERank from '../../../common/ERank/index'

import image1 from './assets/1pb.png'
import image2 from './assets/1pb.png'
import image3 from './assets/3pb.png'
import image4 from './assets/4pb.png'
import image5 from './assets/5pb.png'
import image6 from './assets/6pb.png'
import image7 from './assets/7pb.png'
import image8 from './assets/8pb.png'
import image9 from './assets/9pb.png'
import image10 from './assets/10pb.png'

import './eres.scss';

class ERes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            total:null,
            info:[],
            score:null,
            img:false,
            imgUrl:null,
        }
    }

    
    componentWillMount() {
        hyExt.request({
            header: {
            },
            url: 'http://zaccc.lzok.top/user/last/',
            method: 'POST',
            dataType: 'json',
            data: {
                "gameid": global.info.gameid,
                "gamewordid": global.info.gamewordid,
            }
        }).then(({ data, statusCode }) => {
            let myScoreUrl = `./assets/${data.score}pb.png`;
            if (statusCode == 200) {
                this.setState({
                    total: data.total,
                    info: data.info,
                    score: data.score,
                    img:true,
                })
                this.props.history.push('/midres')
            }
        }).catch(err => {
            clearInterval(this.timer);
            hyExt.logger.warn('调用失败', err)
        })
    }
    
    render(){

        let arr = [
            {
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
                score: '88',
                name: "clearlove",
                time: '1秒'
            },
            {
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
                score: '88',
                name: "clearlove",
                time: '1秒'
            },
            {
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
                score: '88',
                name: "clearlove",
                time: '1秒'
            },
            {
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
                score: '88',
                name: "clearlove",
                time: '1秒'
            },
            {
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
                score: '88',
                name: "clearlove",
                time: '1秒'
            }, {
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
                score: '88',
                name: "clearlove",
                time: '1秒'
            },
            {
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
                score: '88',
                name: "clearlove",
                time: '1秒'
            },
            {
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
                score: '88',
                name: "clearlove",
                time: '1秒'
            },
            {
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564857128706&di=7e521e55fbc426898dc335e737049bf6&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F47%2F97%2F5bade9846f0a5_610.jpg',
                score: '88',
                name: "clearlove",
                time: '1秒'
            },
        ]
        return(
            <div className="eres">
                <div className="eres_tit">我的总成绩</div>
                <div>
                    {this.img ? <img className='eres_img' src={this.state.imgUrl}/> : <div>{this.state.score}</div>}
                    {/* <div className="eres_score"> 8 分</div> */}
                </div>
                <div className="eres_res">
                    <div className="eres_res_one">
                        <div >排名击败</div>
                        <div ><span className="eres_font">85%</span>对手</div>
                    </div>
                    <div className="eres_res_one">
                        <div>手速击败</div>
                        <div ><span className="eres_font">50%</span>对手</div>
                    </div>
                </div>
                <div className="eres_erank">
                    {this.state.img && <ERank res={this.state.info} number={7} iamge={true}/>}
                </div>
                <div>
                    <div className="eres_btn" onClick={this.sendData}>退出游戏</div>
                </div>
            </div>
        )
    }
}

export default ERes;