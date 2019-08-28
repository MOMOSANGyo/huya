import React, {Component} from 'react'
import './index.scss'

class Rank extends Component{
    
    render(){
        let list  = this.props.res.slice(0,7);

        const content = (Object.prototype.toString.call(list) == "[object Array]") ?
            (
                <div >
                    {list.map((item, index) =>
                        <div key={index} className={`rank_con_list ${item.name === "我"?"rank_me_list":""}`} style={{ backgroundColor: item.name === "我" ? 'rgba(0, 0, 0, 0.7)': 'rgba(0, 0, 0, 0.5)'}}>
                            <span>
                                <div className="avatar">
                                    <img className="ava_img" src={item.url}></img>
                                </div>
                            </span>
                            <span className="list_name">{item.name}</span>
                            <span className="list_answer">{item.answer}</span>
                            <span className="list_time">{item.time}秒</span>
                        </div>
                    )}
                </div>
            ) : (<div>未显示结果</div>)
        return(
            <div className="rank">
                <div className="rank_title">
                    <span className="rank_tit_span1">回答情况</span>
                    <span className="rank_tit_span2">回答人数：{this.props.num}/{this.props.totalnum}</span>
                </div>
                <div className="rank_content">
                   
                       {content}
                       
                </div>
            </div>
        )
    }
}

export default Rank;