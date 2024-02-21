import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react'
import Index from './Index.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignIn = () => {
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      }  
    }).then((res) => {
      console.log(res);
      if (res.data.errors) {
        emailError.innerHTML = res.data.errors.email;
        passwordError.innerHTML = res.data.errors.password;
      }else{
       window.location = "/";
      }
    }).catch((err) => {
      console.log(err)
    })
  };
  return (
    <div>
    
    <div className='form-i'>
      <h5>Connecter-vous à votre compte Admin</h5>
      <br/>
      <form action=" " onSubmit={handleLogin} id="sign-in-form">
        <input 
         type='email'
         name='email'
         placeholder='Adresse e-mail' 
         required
         className='inputs-forgot' 
         id="email" 
         onChange={(e) => setEmail(e.target.value)}
         value={email} /> 
         <div className="email error"></div>     
        <br/>
        <input 
        type='password'      
        name='password'
        placeholder='Mot de passe'
        required
        className='inputs-forgot'
        id="password" 
        onChange={(e) => setPassword(e.target.value)}
        value={password}/> 
        <div className='forgot'>
        <Link to="/forgot" className='no-deco1'>Mot de passe oublié ?</Link>
        </div>
        <div className="password error "></div>
        <br/>
        <input type='submit' value="Connexion" className='btn btn-success w-100 rounded-0'/>
      </form>      
    </div>
    </div>
  )
}

export default SignIn;

