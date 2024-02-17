import React from 'react'
import logo from './ic-bas.png'
import profilIcon from './logout.svg'
import header from './Header.css'

function Header() {
  return (
    <div>
       <div className="containers">
        <div className='header-container'>
          <img src={logo} className="logo" alt=''/>
        </div>
        <div className="user-profil">
        <img src={profilIcon} className="profilIcon" alt=''/>
        </div>
      </div>
    </div>
  )
}

export default Header

      