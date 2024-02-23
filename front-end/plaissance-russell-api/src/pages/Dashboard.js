import React from 'react'
import Header from '../components/Nav/Header'
import Footer from '../components/Footer/Footer'
import LayoutAside from '../components/LayoutAside/LayoutAside'
import dashboard from '../styles/dashboard.css'
import Sidebar from '../components/Sidebar/Sidebar';
import UseRedirectLogOut from "../HookDirection/useRedirectLogOut"


function Dashboard() {
  UseRedirectLogOut("/")
  return (
    <div className='dashboards'>
      <Header/>
      <section className="aside-left">
      <Sidebar />
      </section>
      <>
        <div className="layout-aside">
          <LayoutAside/>
        </div>
       
      </>
       <div className="footer">
          <Footer/>
        </div>
    </div>
  )
}

export default Dashboard
