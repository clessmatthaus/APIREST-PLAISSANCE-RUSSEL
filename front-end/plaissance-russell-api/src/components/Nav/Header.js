import React from 'react'
import logo from './ikons.png'
//import profilIcon from './logout.svg'
import header from './Header.css'
import { AiOutlineLogout } from "react-icons/ai";

function Header() {
  return (
    <div>
       <div className="containers">
        <div className='header-container'>
          <img src={logo} className="logo" alt=''/>
        </div>
        <div className="user-profil">
        <AiOutlineLogout size={30}/>
        </div>
      </div>
    </div>
  )
}

export default Header

      