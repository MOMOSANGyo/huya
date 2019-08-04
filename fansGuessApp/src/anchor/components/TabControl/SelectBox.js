import React, { useState } from 'react'
import './index.scss'
import classnames from 'classnames'

function SelectBox(props) {
  const [value, setValue] = useState('');
  const boxOption = [
    {
      label: '现在',
      value: 0
    },
    {
      label: '5分钟后',
      value: 5
    },
    {
      label: '10分钟后',
      value: 10
    },
    {
      label: '20分钟后',
      value: 20
    },
    {
      label: '30分钟后',
      value: 30
    },
    {
      label: '1小时候',
      value: 60
    },
  ]

  function handleClick(value) {
    console.log('-v---', value);
    props.onChange(value);
  }
  return(
    <div className="selectbox-bg">
      <ul className="time-list">
      {
        boxOption.map((item, i) => {
          return(
            <li key={i} className="select-li" value={item.label} onClick={() => {handleClick(item.label)}} >
            {item.label}
            </li>
          )
        })
      }
      </ul>
      
    </div>
  );
}

export default SelectBox;

