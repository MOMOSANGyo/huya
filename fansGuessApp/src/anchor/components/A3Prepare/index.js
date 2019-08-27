import React, { useState, useEffect } from 'react'
import './index.scss'
import {Button} from 'antd'
import TimeProgress from '../../../common/TimeProgress'
import { getGameDetail, prepareOk } from '../../anchorModel'
import { getGameID } from '../../../utils/util'

const PrepareView = (props) => {

  const [listData, setListData] = useState([]); 
  const [time, setTime] = useState();

  async function init() {
    console.log('====props===', props);
    const gtime = props.match.params.gametime;
    console.log('====gtime======', gtime);
    const gameid = getGameID();
    console.log('=======a2getGameID===========', gameid);
    const payload = {
      gameid: gameid
    }
    const res = await getGameDetail(payload);
    const list = res.word || [
      "王者荣耀",
      "王者荣耀",
      "王者荣耀",
      "王者荣耀",
      "王者荣耀",
      "王者荣耀",
      "王者荣耀",
      "王者荣耀",
      "王者荣耀",
      "王者荣耀"
    ]
    if(!isNaN(parseInt(gtime))) {
      setTime(parseInt(gtime));
    }else{
      setTime(60);
    }

    setListData(list);
  }

  useEffect(() => {
    init();
  }, [])

  function handleClick() {
    const gameid = getGameID();
    console.log('=======getGameID===========', gameid);
    const payload = {
      gameid: gameid
    }
    prepareOk(payload);
    props.history.push('/play/undefined');
  }
    return (
      <div className="a3-container">
        <div>
          <div style={{ marginTop: 22}}>请在60秒时间内熟悉熟悉下列10个词语</div>
          <TimeProgress theme='purple' style={{ marginTop: 24 }} time={time}/>
        </div>
        
        <div className="prepare-words">
          <ul>
          {
            listData.map((item, i) => {
              return <li key={i} className="detail-text">{item}</li>
            })
          }
          </ul>
        </div>
        <Button className="ok-btn" onClick={handleClick}>准备好了</Button>
      </div>
    )
}

export default PrepareView