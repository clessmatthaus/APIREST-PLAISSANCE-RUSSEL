import React from 'react'
import logo from './ikons.png'
//import profilIcon from './logout.svg'
import header from './Header.css'
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

function Header() {

  const navigate = useNavigate()

  const goToHome = () => {
    navigate("/")
  }
  return (
    <div>
       <div className="containers">
        <div className='header-container'>
         <img src={logo} className="logo" alt='' onClick={goToHome}/> 
        </div>
        <div className="user-profil">
        <AiOutlineLogout size={30}/>
        </div>
      </div>
    </div>
  )
}

export default Header

      