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
        this.handleCompositionEnd = (e, index) => {
            console.log('=========handleCompositionEnd=============', e, e.data);
            let ans = this.state.answer;
            const data = ans[index] + (e.data.trim() || "").split("");
            let len = data.length;
            if(data.length >=1){
                console.log('====data====',data, data.length);
                data.forEach((item,i) => {
                    if(index + i < this.inputRefs.length) {
                        ans[index + i] = item
                    }
                    
                })

                this.inputRefs[index].blur();
            }
            console.log('======inputRefs.length========', index, this.inputRefs.length);
            if(index + len < this.inputRefs.length) {
                this.inputRefs[index + len].focus();
            }
            else {
                this.inputRefs[this.inputRefs.length - 1].focus();
            }
            this.setState({
                inputstatus: true,
                answer: ans
            })
            
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
            console.log('=====focus====');
            this.inputRefs[0].focus();
        }
        
    }
    handleKeyUp(e, index){
        console.log('======handleKeyUp=======', e, e.keyCode);
        if(e.keyCode === 8 || e.keyCode === 46){
            if(index > 0) {
                this.inputRefs[index - 1].focus();  
            }
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
        if(e.target.value.length >=1) {
            if(index < this.inputRefs.length-1 && this.state.inputstatus){
                this.inputRefs[index].blur();
            }
            if(index < this.inputRefs.length-1  && this.state.inputstatus) {
                this.inputRefs[index + 1].focus();
            }
            else if(index >= this.inputRefs.length-1 && this.state.inputstatus) {
                this.inputRefs[this.inputRefs.length-1].focus();
            }
        }
        console.log('======this.state.inputstatus========', this.state.inputstatus);
        console.log('======inputRefs.length========', index, this.inputRefs.length);

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
                        autoComplete="off"
                        disabled={this.props.disabled}
                        ref={(element) => {this.setInputRef(element, index)}}
                        value={item}
                        onKeyUp={(e) => {this.handleKeyUp(e, index)}}
                        onChange={this.onChange.bind(this,index)}
                        onCompositionStart={this.handleCompositionStart}
                        onCompositionEnd={(e) => {this.handleCompositionEnd(e, index)}}
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