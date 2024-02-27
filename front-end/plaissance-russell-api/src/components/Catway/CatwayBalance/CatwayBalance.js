import React from 'react'
import "./CatwayBalance.css"
import { LuLayoutDashboard } from "react-icons/lu";
import { RiStockFill } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import InfoBox from "../../InfoBox/InfoBox";

const TotalStockIcon = <AiOutlineStock size={35} color="green"/>
const DispoStockIcon = <RiStockFill size={35} color="red"/>
const TypesIcon = <LuLayoutDashboard size={35} color="blue"/>

const CatwayBalance = ({catways}) => {
  return (
    <div>
    <div className='infobalance'>
      <h2>Géstion de catways</h2>
    <div className='infobalance-div'>
      <InfoBox icon={TotalStockIcon} title={"Catways disponible"} count={catways.length} bgColor="card1"/>
      <InfoBox icon={DispoStockIcon} title={"Non disponible"} count={"0"} bgColor="card2"/>   
      <InfoBox icon={TypesIcon} title={"Catways Types"} count={"0"} bgColor="card3"/>
    </div>
    </div>
    </div>
  )
}

export default CatwayBalance
