import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Index from './Index.css';

function SignUp() {
  return (
    <div>
    
    <div className='form-i'>
      <h5>Créer votre compte</h5>
      <br/>
      <form>
      <div className=''>
        <input type='name' placeholder='Pseudo' name='name' className='inputs-forgot' required/>
        </div>
        <div className=''>
        <input type='email' placeholder='Adresse e-mail' name='email' className='inputs-forgot' required/>
        </div>
        <div className=''>
        <input type='password' placeholder='Mot de passe' name='password' className='inputs-forgot' required/>
        </div>
        <div className=''>
        <input type='password' placeholder='Confirmer le mot de passe' name='password' className='inputs-forgot' required/>
        </div>
        <br/>
        <div className="input-check"><input type="checkbox" className="checkbox1"/> <p>J'accepte les <span className="check-span">conditions générales</span></p></div>
        <button type='submit' className='btn btn-danger w-100 rounded-0'>Créer mon compte</button>
      </form>
      
    </div>
    </div>
  )
}

export default SignUp
