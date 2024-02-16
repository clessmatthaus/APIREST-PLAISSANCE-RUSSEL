import React from 'react'
import logo from './logo-apis.png'
import profilIcon from './logout.svg'
import header from './Header.css'

function Header() {
  return (
    <div>
       <div className="containers">
        <div className='header-container'>
          <img src={logo} className="logo" alt=''/>
          <ul>
            <li>Home</li>
            <li>Catways</li>
            <li>Réservation</li>
          </ul>
        </div>
        <div className="user-profil">
        <img src={profilIcon} className="profilIcon" alt=''/>
        </div>
      </div>
    </div>
  )
}

export default Header

      