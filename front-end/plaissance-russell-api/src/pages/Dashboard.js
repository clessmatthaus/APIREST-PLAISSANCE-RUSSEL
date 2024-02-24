import React from 'react'
import UseRedirectLogOut from "../HookDirection/useRedirectLogOut"
import dashboard from '../styles/dashboard.css'
import { useDispatch, useSelector } from "react-redux"
import {useEffect } from "react"
import CatwayList from '../components/Catway/CatwayList/CatwayList';
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import {getCatways} from "../redux/features/catways/catwaySlice";


const Dashboard = () => {
  UseRedirectLogOut("/")
  const dispatch = useDispatch()
  
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const {catways, isLoading, isError, message} = useSelector((state) => state.catway)

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getCatways())
    }
  

    if(isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  return (
    <div className='dashboards'>
         <CatwayList  catways={catways} isLoading={isLoading}/>
    </div>
  )
}

export default Dashboard
