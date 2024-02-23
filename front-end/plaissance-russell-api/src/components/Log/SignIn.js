import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react'
import Index from './Index.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginUser, validateEmail } from '../../services/authServices';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../Loader/Loader';

const initialState = {
  email: "",
  password: ""
}

const SignIn = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const {email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    
    if(!email || !password) {
      return toast.error("Tous les champs doivent etre complétés")
    }
    if(!validateEmail(email)) {
      return toast.error("Veuillez renseigner un email valide")
    }
    
    const userData = {email, password}
    setIsLoading(true)

    try {
      const data = await loginUser(userData)
      console.log(data)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate("/dashboard")
      setIsLoading(false)
    }
    catch (error) {
      
      setIsLoading(false)
    }
  }

  return (
  <div>
    {isLoading && <Loader />}   
    <div className='form-i'>
      <h5>Connecter-vous à votre compte Admin</h5>
      <br/>
      <form action=" " id="sign-in-form" onSubmit={login}>
        <input 
         type='email' name='email' placeholder='Adresse e-mail' required
         className='inputs-forgot' id="email" value={email} onChange={handleInputChange}/>    
        <br/>
        <input type='password'name='password'placeholder='Mot de passe'    
        required className='inputs-forgot'id="password" value={password} onChange={handleInputChange}/> 
        <div className='forgot'>
        <Link to="/forgot" className='no-deco1'>Mot de passe oublié ?</Link>
        </div>
        <br/>
        <input type='submit' value="Connexion" className='btn btn-secondary w-100 rounded-2'/>
      </form>      
    </div>
  </div>
  )
}

export default SignIn;

