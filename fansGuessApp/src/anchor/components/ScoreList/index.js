import React, { Component, useState, useEffect } from 'react'
import './index.scss'


function ScoreList(props) {
  const [listdata, setListData] = useState(props.res);
  console.log('----listdata---', listdata);
  useEffect(() => {
    if(props.res.length > 7) {
      const data = props.res.slice(0, 7);
      setListData(data);
    }
    else
    {
      setListData(props.res);
    }
  },[props.res]);

  return(
    <div className={`scorelist-container ${props.className}`}>
      <div className="scorelist-header">
        <div className="title">回答情况</div>
        <div className="people">回答人数: {`${props.num}/${props.total}`}</div>
      </div>
      <div className="scorelist-body">
      {(Array.isArray (props.res)) ?
          (
              <div >
                  {listdata.map((item, index) =>
                      <div key={index} className="con_list">
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
          ) : (<div>请重新进入</div>)}
      </div>
    </div>
  );
}
export default ScoreList;