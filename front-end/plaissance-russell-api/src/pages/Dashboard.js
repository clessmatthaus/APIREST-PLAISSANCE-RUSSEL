import React from 'react'
import UseRedirectLogOut from "../HookDirection/useRedirectLogOut"
import dashboard from '../styles/dashboard.css'


function Dashboard() {
  UseRedirectLogOut("/")
  return (
    <div className='dashboards'>
        
         <h1>DASHBOARD</h1>
     
    </div>
  )
}

export default Dashboard
