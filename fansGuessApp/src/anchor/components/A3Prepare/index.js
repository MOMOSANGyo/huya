import React, { useState, useEffect } from 'react'
import './index.scss'
import {Button} from 'antd'
import TimeProgress from '../../../common/TimeProgress'
import { getGameDetail } from '../../anchorModel'
import { getGameID } from '../../../utils/util'

const PrepareView = (props) => {

  const [listData, setListData] = useState([]); 

  async function init() {
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
    setListData(list);
  }

  useEffect(() => {
    init();
  }, [])

    return (
      <div className="a3-container">
        <div style={{ marginTop: 30}}>请在60秒时间内熟悉熟悉下列10个词语</div>
      	<TimeProgress theme='purple' style={{ marginTop: 30 }}/>
        <div className="prepare-words">
          <ul>
          {
            listData.map((item, i) => {
              return <li key={i} className="detail-text">{item}</li>
            })
          }
          </ul>
        </div>
        <Button className="ok-btn" onClick={() => {props.history.push('/play')}}>准备好了</Button>
      </div>
    )
}

export default PrepareView