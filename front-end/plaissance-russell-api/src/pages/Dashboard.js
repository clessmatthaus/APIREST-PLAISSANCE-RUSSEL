import React from 'react'
import Header from '../components/Nav/Header'
import dashboard from '../styles/dashboard.css'
import userIcon from '../components/Nav/user-solids.svg'

function Dashboard() {
  return (
    <div className='dashboards'>
      <Header/>
      <section className="aside-left">
        <div className="status-profil">
          <img src={userIcon} className="status-icon" alt=''/>
          <h5>Admin : </h5>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
