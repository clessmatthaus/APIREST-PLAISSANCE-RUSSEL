import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Index from './Index.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import {useState} from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { resetPassword } from '../../services/authServices';

const initialState = {
  password: "",
  passwordconfirm: ""
}

function Reset() {


  const [formData, setFormData] = useState(initialState);
  const { password, passwordconfirm } = formData;

  const {resetToken} = useParams()
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const resetPass = async (e) => {
    e.preventDefault();
    
    if(password.length < 8) {
      return toast.error("Le mot de passe doit comporté au minimum 8 caractères")
    }
    if(password !== passwordconfirm) {
      return toast.error("Mot de passe non identique")
    }
    const userData = {password, passwordconfirm}
    
    try {
      const data = await resetPassword(userData, resetToken)
      toast.success(data.message)
    } catch (error) {
       console.log(error.message)
    }
  }

  return (
    <div className="forgot-container">
    <div className='forgot-form'>
    <RiLockPasswordLine size={50}/>
    <br/>
      <h3>Réinitialiser le mot de passe</h3>
      <br/>
      <form action=" " id="sign-in-form" onSubmit={resetPass}>
        <input type='password' value={password} onChange={handleInputChange} name='password' placeholder='Nouveau mot de passe' required className='inputs-forgot w-100' /> 
        <input type='password' value={passwordconfirm} onChange={handleInputChange} name='passwordconfirm' placeholder='Confirmer le nouveau mot de passe' required className='inputs-forgot w-100' /> 
        <button className="forgot-btn w-100">Réinitialiser votre mot de passe</button>
        <br/>
        
       <div className="back-home"> <Link to="/" className='no-deco1'><IoMdArrowRoundBack size={15}/> Accueil </Link></div>
       
      </form>      
    </div>
    </div>
  )
}

export default Reset