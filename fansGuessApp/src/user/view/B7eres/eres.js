import '../config'
import React,{Component} from 'react';
import ERank from '../../../common/ERank/index'
import { scoreImg, scoreBG } from './config'


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
            srate:null,
            vrate:null,
        }
        this.toFirstOne = this.toFirstOne.bind(this);
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
            console.log('----eres---')
            console.log('----eres---')
            console.log('----eres---')
            console.log(data);
            let myScoreUrl = `./assets/${data.score}pb.png`;
            if (statusCode == 200) {
                this.setState({
                    total: data.total,
                    info: data.info,
                    score: data.score,
                    srate:data.srate,
                    vrate:data.vrate,
                    img:true,
                    imgUrl:myScoreUrl,
                })
              
            }
        }).catch(err => {
            clearInterval(this.timer);
            hyExt.logger.warn('调用失败', err)
        })
    }
    
    toFirstOne(){
        this.props.history.push('/');
    }
    render(){

        
        return(
            <div className="eres" 
                style={{ backgroundImage: `url(${scoreBG[this.state.score]})` }}
            >
                <div className="eres_tit">我的总成绩</div>
                <img className="eres_img" src={scoreImg[this.state.score]}/>
                <div className="eres_res">
                    <div className="eres_res_one">
                        <div >排名击败</div>
                        <div ><span className="eres_font">{this.state.srate}</span> 对手</div>
                    </div>
                    <div className="eres_res_one">
                        <div>手速击败</div>
                        <div ><span className="eres_font">{this.state.vrate}</span> 对手</div>
                    </div>
                </div>
                <div>
                    <div className="eres_erank">
                        {this.state.img && <ERank res={this.state.info} number={7} iamge={true} total={this.state.total}/>}
                    </div>
                    <div>
                        <div className="eres_btn" onClick={this.toFitstOne}>退出游戏</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ERes;