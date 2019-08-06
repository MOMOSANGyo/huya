import React, { Component } from 'react'
import './index.scss'


function List(props){
    return(
        (Object.prototype.toString.call(props.res) == "[object Array]") ?
            (
                <div >
                    {props.res.map((item, index) =>
                        <div key={index} className="erank_con_list">
                            <span className="list_pre">
                            <span className="erank_list_index">{props.currentPage * props.number + (index + 1)}</span>
                            <span>
                                <div className="avatar">
                                    <img className="ava_img" src={item.url}></img>
                                </div>
                            </span>    
                            <span className="list_name">{item.name}</span>
                            </span>
                    
                            <span className="list_score">{item.score}</span>
                            <span className="list_time">{item.time}</span>
                            
                        </div>
                    )}
                </div>
            ) : (<div style={{color:'#fff'}}>请重新进入</div>)

    )
}

class ERank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res: [],
            allres:[],
            currentPage:0,
            length:0,
            number:0,
        }
    }
    
    componentWillMount() {
        this.setState({
            res:this.props.res.slice(0,this.props.number),
            allres:this.props.res,
            length:this.props.res.length, 
            number: this.props.number,
        })
    }

    Switch(){
        if ((this.state.currentPage + 1) * this.state.number < this.state.length) {
            let startindex = (this.state.currentPage + 1) * this.state.number;
            let endindex = startindex + this.state.number;
            let item = this.state.allres.slice(startindex, endindex);
            console.log(item);
            this.setState({
                currentPage: this.state.currentPage + 1,
                res: item,
            })
        }
   }

    
    render() {
        
        return (
            <div className="erank">
                <div className="erank_container">
                <div className="erank_header">
                    <span className="erank_header_span1">排名(共20人)</span>
                    <span className="erank_header_span2">总分</span>
                    <span className="erank_header_span3">用时</span>
                </div>
               
                <div className="erank_con" style={{height:(this.state.number*41+8 +'px')}}>
                   <List res = {this.state.res} 
                   currentPage={this.state.currentPage} 
                   number={this.state.number}
                   /> 
                </div>
               
                </div>
                <div onClick={this.Switch.bind(this)}>
                    <img className="erank_btn" src={require("./btn.png")} />
                </div>
            </div>
            
        )
    }
}

export default ERank;