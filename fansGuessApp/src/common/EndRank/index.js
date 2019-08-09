import React, { Component } from 'react'
import './index.scss'


function List(props){
<<<<<<< HEAD
    console.log('props.res');
    console.log('props.res');

    console.log('props.res');
    console.log('props.res');

    console.log(props.res);
=======
    console.log('======props=====', props);
>>>>>>> 0e95b42a896c294f5e02b3d13c3df22aa9377bb7
    return(
        (Object.prototype.toString.call(props.res) == "[object Array]") &&
            (
                <div >
                    {props.res.map((item, index) =>
                        <div key={index} className="endrank_con_list" style={{ backgroundColor: item.name === "我" ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)' }}>
                            <span className="endrank_list_index">{props.currentPage * props.number + (index + 1)}</span>
                            <span>
                                <div className="avatar">
                                    <img className="ava_img" src={item.url}></img>
                                </div>
                            </span>
                            <span className="list_name">{item.name}</span>
                            <span className="list_time">{item.time}秒</span>
                        </div>
                    )}
                </div>
            ) 

    )
}

function FalseList(props){
    return(
        (Object.prototype.toString.call(props.res) == "[object Array]") ?
            (
                <div >
                    {props.res.map((item, index) =>
                        <div key={index} className="endrank_false_list" style={{ backGroundColor: props.myanswer && 'rgba(0, 0, 0, 0.7)' }}>
                            {item}
                        </div>
                    )}
                </div>
            ) : (<div>请重新进入</div>)
    )
}
class EndRank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res: [],
            allres:[],
            currentPage:0,
            length:0,
            fRes:[],
            allfRes:[],
            fLength:0,
            fCurrentPage:0,
            isTrue:true,
            number:0,
            fNumber:0,
        }
    }
    
    componentWillMount() {
        this.setState({
            res:this.props.res.slice(0,this.props.number),
            allres:this.props.res,
            length:this.props.res.length,
            fRes: this.props.fRes.slice(0,this.props.fNumber),
            allfRes: this.props.fRes,
            fLength: this.props.fRes.length,
            number: this.props.number,
            fNumber: this.props.fNumber,
        })
    }

    Switch(){
        if(this.state.isTrue)
        {
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
    }else{
            if ((this.state.fCurrentPage + 1) * this.state.fNumber < this.state.fLength) {
                let startindex = (this.state.fCurrentPage + 1) * this.state.fNumber;
                let endindex = startindex + this.state.fNumber;

                let item = this.state.allfRes.slice(startindex, endindex);
               
                this.setState({
                    fCurrentPage: this.state.fCurrentPage + 1,
                    fRes: item,
                })
            }
    }
   }

   changeTrue(){
       this.setState({
           isTrue:true,
       })
   }

    changeFalse() {
        this.setState({
            isTrue: false,
        })
    }
    
    render() {
        console.log('==render==', this.state);
        return (
            <div className="endrank">
               
                <div className="endrank_container">
                    <div className="endrank_header">
                        <div className="header_t"
                            style={{ backgroundColor: this.state.isTrue ? '#4355ff' : '#000000', zIndex:this.state.isTrue?'99':'0'}}
                            onClick={this.changeTrue.bind(this)}>答对排名</div>

                        <div className="header_f"
                            style={{ backgroundColor: this.state.isTrue ? '#000000' : '#f1574f', zIndex:this.state.isTrue?'0':'99' }}
                            onClick={this.changeFalse.bind(this)}>错误回答</div>
                    </div>
                <div className="endrank_con" style={{height:this.state.isTrue?(this.state.number*33 + 8  +'px'):this.state.fNumber*33+'px'}}>
                   {this.state.isTrue ? 
                   <List res = {this.state.res} 
                   currentPage={this.state.currentPage} 
                   number={this.state.number}
                   /> : 
                   <FalseList res={this.state.fRes} number="props.fNumber"/>}
                </div>
                
                </div>
                <div onClick={this.Switch.bind(this)}>
                    <img className="endrank_btn" src={require("./btn.png")} />
                </div>
            </div>
            
        )
    }
}

export default EndRank;