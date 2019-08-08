import React, { Component } from 'react'
import './index.scss'

class MyInput extends Component {

    constructor(props) {
        super(props);
        this.state ={
            answer:[]
        }
    }

    
    componentWillMount() {
        this.setState({
            answer:this.props.answer
        })
    }
    
    onChange(index,e){
        //效果还不是很好
        //let res = e.target.value.charAt(e.target.value.length - 1)
        let item = this.state.answer;
        item[index] = e.target.value;
        this.setState({
            answer:item
        })
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
                        value={item}
                        onChange={this.onChange.bind(this,index)}/>
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