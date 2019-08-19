import React, { Component } from 'react'
import EndRank from '../../../common/EndRank/index'

import correct from './assets/false.png'
import './fres.scss'

class ResultView extends Component {
    render() {
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
        let fRes = ['错误回答']
        return (
            <div className="result">
                <div className="result_header">
                <div className="result_header1">
                    <div className="result_header_index">第一题</div>
                    <div className="result_header_tit">奥尔良烤鸡翅</div>
                </div>
                <div className="result_header2">
                    <div className="result_header_index2">我的回答</div>
                    <div className="result_header_tit2">奥尔良烤鸡翅</div>
                </div>
                </div>
                <div>
                    <img className="result_img" src={correct} />
                    <div className="result_correct">猜错了</div>
                </div>
                <div className="result_res">
                    <div className="result_res_one">
                        <div >手速击败</div>
                        <div className="result_font"><span>10%</span>对手</div>
                    </div>
                    <div className="result_res_one">
                        <div>累积得分</div>
                        <div className="result_font"><span>1</span>分</div>
                    </div>
                </div>
                <div className="result_footer">

                    <div className="result_footer_endrank">
                        <EndRank fRes={fRes} fNumber={5} res={arr} number={6} />
                    </div>
                    <div className="result_footer_one">共20人参加游戏，8人回答正确</div>
                </div>

            </div>
        )
    }
}

export default ResultView;