import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react'
import Index from './Index.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignIn = () => {

  return (
  <div>   
    <div className='form-i'>
      <h5>Connecter-vous à votre compte Admin</h5>
      <br/>
      <form action=" " id="sign-in-form">
        <input 
         type='email' name='email' placeholder='Adresse e-mail' required
         className='inputs-forgot' id="email" />    
        <br/>
        <input type='password'name='password'placeholder='Mot de passe'    
        required className='inputs-forgot'id="password"/> 
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

