import React from 'react'
import { Link } from 'react-router-dom';
import Index from './Index.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import {useState} from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { validateEmail, forgotPassword } from '../../services/authServices';

function Forgot() {

  const [email, setEmail] = useState("")

  const forgotPass = async (e) => {
     e.preventDefault()

    if(!email) {
      return toast.error("Veuillez renseigner un email")
    }
    if(!validateEmail(email)) {
      return toast.error("Veuillez renseigner un email valide")
    }
    
    const userData = {email}
    
    await forgotPassword(userData)
    setEmail(" ")
    
  }

  return (
    <div className="forgot-container">
    <div className='forgot-form'>
    <MdOutlineEmail size={50} />
    <br/>
      <h3>Mot de passe oublié</h3>
      <br/>
      <form action=" " id="sign-in-form" onSubmit={forgotPass}>
        <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Adresse e-mail' required className='inputs-forgot w-100' /> 
        <button className="forgot-btn w-100">Réinitialiser l'email</button>
        <br/>
       <div className="back-home"> <Link to="/" className='no-deco1'><IoMdArrowRoundBack size={15}/> Login </Link></div>       
      </form>      
    </div>
    </div>
  )
}

export default Forgot