import React from 'react'
import "./CatwayBalance.css"
import { LuLayoutDashboard } from "react-icons/lu";
import { RiStockFill } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import InfoBox from "../../InfoBox/InfoBox";
import {CALC_MANAGEMENT_DATA, selectType} from "../../../redux/features/catways/catwaySlice";
import { useDispatch, useSelector } from "react-redux"
import {useEffect} from "react"
const TotalStockIcon = <AiOutlineStock size={35} color="green"/>
const DispoStockIcon = <RiStockFill size={35} color="red"/>
const TypesIcon = <LuLayoutDashboard size={35} color="blue"/>

const CatwayBalance = ({catways}) => {
  const dispatch = useDispatch()
  const type = useSelector(selectType)

  useEffect(() => {
     dispatch(CALC_MANAGEMENT_DATA(catways))
  }, [dispatch, catways]);
  return (
    <div>
    <div className='infobalance'>
      <h2>Géstion de catways</h2>
    <div className='infobalance-div'>
      <InfoBox icon={TotalStockIcon} title={"Nombre de Catways"} count={catways.length} bgColor="card1"/>
      <InfoBox icon={TypesIcon} title={"Types de catway"} count={type.length} bgColor="card3"/>
    </div>
    </div>
    </div>
  )
}

export default CatwayBalance
