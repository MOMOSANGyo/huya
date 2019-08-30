import React, {Component} from 'react'

export default class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minute: '00',
      second: '00'
    }
  }
  componentDidMount() {
      // console.log('this.props.time')
      // console.log(this.props.time)
      this.countFun(this.props.time);
  }
  //组件卸载取消倒计时
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  
  countFun (time){
      clearInterval(this.timer)
    let  sys_second = time * 1000

    this.timer = setInterval(() => {
    //防止倒计时出现负数
      if (sys_second > 1000) {
        sys_second -= 1000;
       
        let minute = Math.floor((sys_second / 1000 / 60) % 60);
        let second = Math.floor(sys_second / 1000 % 60);
        this.setState({
          
          minute:minute < 10 ? "0" + minute : minute,
          second:second < 10 ? "0" + second : second
        })
      } else {
        clearInterval(this.timer);
        this.setState({
            minute:"00",
            second:"00",
        })
      }
    }, 1000);
  }
  render() {
    return (
      <span style={{ color: '#f1574f' }}>{this.state.minute}:{this.state.second}</span>
    )
  }
}
