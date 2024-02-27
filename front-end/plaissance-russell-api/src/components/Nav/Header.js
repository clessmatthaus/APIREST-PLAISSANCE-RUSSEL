import React from 'react'
import logo from './ikons.png'
import login from './greens.gif'
//import profilIcon from './logout.svg'
import header from './Header.css'
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { logoutUser } from '../../services/authServices';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { SET_LOGIN, setIsName } from '../../redux/features/auth/authSlice';

function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const name = useSelector(setIsName)

  const logout = async () => {
   
      await logoutUser();
      await dispatch(SET_LOGIN(false))
      navigate("/")
  }

  return (
    <div>
       <div className="containers">
        <div className='header-container'>
        <Link to="/"> <img src={logo} className="logo" alt='' /></Link> 
        </div>
        <div className='username'>
        <img src={login}  alt='online' width="55px"/> 
          
        </div>
        <div  className="user-profil">
        <AiOutlineLogout size={30} onClick={logout}/>
        </div>
      </div>
    </div>
  )
}

export default Header

      