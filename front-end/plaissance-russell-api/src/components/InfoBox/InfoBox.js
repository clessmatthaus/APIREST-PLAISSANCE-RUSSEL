import React from 'react'
import './InfoBox.css'


const InfoBox = ({bgColor, title, count, icon}) => {
  return (
    <div className={`infosbox ${bgColor}`}> 
      <div className="info-icon">{icon}</div>
        <div className="stock">
          <h5>{title}</h5>
          <p>{count}</p>
        </div>
    </div>
  )
}

export default InfoBox
