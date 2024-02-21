import React from 'react'
import { Link } from 'react-router-dom';
import Index from './Index.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";

function Reset() {
  return (
    <div className="forgot-container">
    <div className='forgot-form'>
    <RiLockPasswordLine size={50}/>
    <br/>
      <h3>Réinitialiser le mot de passe</h3>
      <br/>
      <form action=" " id="sign-in-form">
        <input type='password' name='password' placeholder='Nouveau mot de passe' required className='inputs-forgot w-100' /> 
        <input type='password' name='password' placeholder='Confirmer le nouveau mot de passe' required className='inputs-forgot w-100' /> 
        <button className="forgot-btn w-100">Réinitialiser votre mot de passe</button>
        <br/>
        
       <div className="back-home"> <Link to="/" className='no-deco1'><IoMdArrowRoundBack size={15}/> Login </Link></div>
       
      </form>      
    </div>
    </div>
  )
}

export default Reset