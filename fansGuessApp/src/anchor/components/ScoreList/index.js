import React, { Component } from 'react'
import './index.scss'


function ScoreList(props) {

  return(
    <div className="scorelist-container">
      <div className="scorelist-header">
        <div className="title">回答情况</div>
        <div className="people">回答人数5/15</div>
      </div>
      <div className="scorelist-body">
      {(Array.isArray (props.res)) ?
          (
              <div >
                  {props.res.map((item, index) =>
                      <div key={index} className="con_list">
                          <span>
                              <div className="avatar">
                                  <img className="ava_img" src={item.url}></img>
                              </div>
                          </span>
                          <span className="list_name">{item.name}</span>
                          <span className="list_time">{item.time}</span>
                      </div>
                  )}
              </div>
          ) : (<div>请重新进入</div>)}
      </div>
    </div>
  );
}
export default ScoreList;