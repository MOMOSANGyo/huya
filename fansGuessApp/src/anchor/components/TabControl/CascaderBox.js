import React, { useState, useEffect } from 'react'
import './index.scss'
import classnames from 'classnames'

function CascaderBox(props) {
  const [value, setValue] = useState([true]);
  const [classKeys, setClassKeys] = useState(['游戏', '网络', '日常']);
  const [detailKeys, setDetailKeys] = useState(['王者荣耀','英雄联盟','LOL','绝地求生']);
  const boxOption = {
    '游戏': ['王者荣耀','英雄联盟','LOL','绝地求生'],
    '网络': ['123','123','345','456'],
    '日常': ['asfsafsf','dsfasdf','weasdf']
  }
  
  useEffect(() => {
    const data = Object.keys(boxOption);
    console.log('--classKeys--', data);
    setClassKeys(data);
    setDetailKeys(boxOption[data[0]]);

  }, []);


  function handleClick(value) {
    console.log('-v---', value);
    props.onChange(value);
  }

  function handleCategoryClick(item, index) {
    let res = [];
    const len = classKeys.length;
    for(let i = 0; i < len; i++) {
      if(index === i) {
        res.push(true);
      }else {
        res.push(false);
      }
    }
    setValue(res);
    setDetailKeys(boxOption[item]);

  }
  return(
    <div className='cascaderbox-container'>
      <div>
      <div className="class-bg">
        <ul className="class-list">
        {
          classKeys.map((item, i) => {
            return(
              <li key={i} className={value[i]? "class-li-selected" : "class-li"} value={item} onMouseMove={() => {handleCategoryClick(item, i)}}>
              {item}
              </li>
            )
          })
        }
        </ul>
      </div>
      </div>
      <div className="detail-bg">
        <ul className="detail-list">
        {
          detailKeys.map((item, i) => {
            return(
              <li key={i} className="detail-li" value={item} onClick={() => {handleClick(item)}}>
              {item}
              </li>
            )
          })
        }
        </ul>
      </div>
    </div>
  );
}

export default CascaderBox;

