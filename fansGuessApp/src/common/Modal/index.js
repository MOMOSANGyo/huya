import React, { useState, useEffect } from 'react'
import { Modal } from 'antd';
import './index.scss'

function InfoModal(props) {
  
  return(
    <div style={{ ...props.style,visibility: props.visible?'visible':'hidden' }} className={`info-modal ${props.className}`} >
      <div className="info-text">
        {props.text}
      </div>
      <div 
        className="model-btn"
        onClick={props.onClick}
      >{props.btnText}</div>
    </div>
  );
}

export default InfoModal;

