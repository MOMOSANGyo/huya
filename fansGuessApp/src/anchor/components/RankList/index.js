import React, { Component } from 'react'
import './index.scss'


function RankList(props) {

  return(
    <div className="ranklist">
      <div className="ranklist-container">
        <div className="ranklist-header">
          <div className="title">排名（共20人）</div>
          <div style={{ width: 82, textAlign: 'right', fontSize: 12 }}>总分</div>
          <div style={{ width: 82, textAlign: 'right', fontSize: 12 }}>用时</div>
        </div>
        <div className="slice"></div>
        <div className="ranklist-body">
        {(Array.isArray (props.res)) ?
            (
                <div >
                    {props.res.map((item, index) =>
                        <div key={index} className="con_list">
                          <span className="list_index">{(index + 1)}</span>
                            <span>
                                <div className="avatar">
                                    <img className="ava_img" src={item.url}></img>
                                </div>
                            </span>                        
                            <span className="list_name">{item.name}</span>
                            <span className="list_score">{item.score}</span>
                            <span className="list_time">{item.time}</span>
                        </div>
                    )}
                </div>
            ) : (<div>请重新进入</div>)}
        </div>
      </div>
      <img className="rank_btn" src={require("./images/arrow.png")} />
    </div>
  );
}
export default RankList;