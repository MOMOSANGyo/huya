import React, { Component } from 'react'
import './index.scss'

class MyInput extends Component {

    constructor(props) {
        super(props);
        this.state ={
            answer:[],
            inputstatus: true
        }
        this.inputRefs = [];
        this.setInputRef = (element, index) => {
            this.inputRefs[index] = element;
        }
        this.handleCompositionStart = () => {
            console.log('=========handleCompositionStart=============');
            this.setState({
                inputstatus: false
            })
        }
        this.handleCompositionEnd = (data, index) => {
            console.log('=========handleCompositionEnd=============');
            this.setState({
                inputstatus: true
            })
            if(data.length >=1){
                this.inputRefs[index].blur();
            }
            console.log('======inputRefs.length========', index, this.inputRefs.length);
            if(index < this.inputRefs.length-1) {
                this.inputRefs[index + 1].focus();
            }
            
        }
    }

    
    componentWillMount() {
        console.log('=======MyInput=props========', this.props);
        
        this.setState({
            answer:this.props.answer
        })
    }

    componentDidMount(){
        console.log('===componentDidMount===', this.inputRefs);
        if(this.inputRefs.length && !this.props.disabled) {
            this.inputRefs[0].focus();
        }
        
    }
    
    onChange(index,e){
        //效果还不是很好
        //let res = e.target.value.charAt(e.target.value.length - 1)
        
        let item = this.state.answer;
        item[index] = e.target.value;
        
        this.setState({
            answer:item,
        })
        console.log(e.target.value)
        console.log('======this.state.inputstatus========', this.state.inputstatus);
        if(e.target.value.length >=1 && this.state.inputstatus){
            this.inputRefs[index].blur();
        }
        console.log('======inputRefs.length========', index, this.inputRefs.length);
        if(index < this.inputRefs.length-1  && this.state.inputstatus) {
            this.inputRefs[index + 1].focus();
        }

        // let item = this.state.answer;
        // console.log(e.target.value)
        // for(let i = 0;i < e.target.value.length;i++)
        // {
        //     item[i] = e.target.value.charAt(i);
        // }
        // this.setState({
        //     answer:item
        // })
        
    }

    render() {
        
        const content = (Object.prototype.toString.call(this.state.answer) == "[object Array]") ?
            (
                <div >
                    {this.state.answer.map((item,index) =>
                        <input 
                        key={index}
                        className="input" 
                        maxLength="1" 
                        id={index}
                        disabled={this.props.disabled}
                        ref={(element) => {this.setInputRef(element, index)}}
                        value={item}
                        onChange={this.onChange.bind(this,index)}
                        onCompositionStart={this.handleCompositionStart}
                        onCompositionEnd={(data) => {this.handleCompositionEnd(data, index)}}
                        />
                    )}
                </div>
            ) : (<div>请重新进入</div>)

        return (
            <div className="my_input">
                {content}
            </div>
        )
    }
}

export default MyInput