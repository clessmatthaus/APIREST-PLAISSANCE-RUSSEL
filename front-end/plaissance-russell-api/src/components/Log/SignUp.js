import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Index from './Index.css';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registerUser, validateEmail } from '../../services/authServices';
import {SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../Loader/Loader"

const initialState = {
  name: "",
  email: "",
  password: "",
  passwordconfirm: ""
}

function SignUp() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const {name, email, password, passwordconfirm} = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const registerNewUser = async (e) => {
    e.preventDefault();

    if(!name || !email || !password) {
      return toast.error("Tous les champs doivent etre complétés")
    }
    if(password.length < 8) {
      return toast.error("Le mot de passe doit comporté au minimum 8 caractères")
    }
    if(!validateEmail(email)) {
      return toast.error("Veuillez renseigner un email valide")
    }
    if(password !== passwordconfirm) {
      return toast.error("Mot de passe non identique")
    }

    const userData = {name, email, password}
    setIsLoading(true)

    try {
      const data = await registerUser(userData)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate("/dashboard")
      setIsLoading(false)
    }
    catch (error) {
      setIsLoading(false)
    }
      
  };

  return (
    <div>
      {isLoading && <Loader />}
    <div className='form-i'>
      <h5>Créer votre compte</h5>
      <br/>
      <form onSubmit={registerNewUser}>
      <div className=''>
        <input type='name' placeholder='Pseudo' required className='inputs-forgot' name='name' value={name} onChange={handleInputChange}/>
        </div>
        <div className=''>
        <input type='email' placeholder='Adresse e-mail' required className='inputs-forgot' name='email' value={email} onChange={handleInputChange}/>
        </div>
        <div className=''>
        <input type='password' placeholder='Mot de passe'  required className='inputs-forgot' name='password' value={password} onChange={handleInputChange}/>
        </div>
        <div className=''>
        <input type='password' placeholder='Confirmer le mot de passe' required className='inputs-forgot' name='passwordconfirm' value={passwordconfirm} onChange={handleInputChange}/>
        </div>
        <br/>
        <div className="input-check"><input type="checkbox" className="checkbox1" required/> <p>J'accepte les <span className="check-span">conditions générales</span></p></div>
        <button type='submit' className='btn btn-dark w-100 rounded-2'>Créer mon compte</button>
      </form>
      
    </div>
    </div>
  )
}

export default SignUp
