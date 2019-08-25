import React, { useState } from 'react'
import './index.scss'
import classnames from 'classnames'

function SelectBox(props) {
  const boxOption = props.option || ["0", "1", "2", "5"];

  function handleClick(value) {
    console.log('-v---', value);
    props.onChange(value);
  }
  return(
    <div className="selectbox-bg"
      onMouseEnter={props.onMouseEnter} 
      onMouseLeave={props.onMouseLeave}
    >
      <ul className="time-list">
      {
        boxOption.map((item, i) => {
          return(
            <li key={i} className="select-li" value={item} onClick={() => {handleClick(item)}} >
            {item == "0"? "现在": `${item}分钟`}
            </li>
          )
        })
      }
      </ul>
      
    </div>
  );
}

export default SelectBox;

