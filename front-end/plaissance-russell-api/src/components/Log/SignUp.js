import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Index from './Index.css';

function SignUp() {
  return (
    <div>
    
    <div className='form-i'>
      <h5>Créer votre compte</h5>
      <form>
      <div className=''>
        <input type='name' placeholder='Pseudo' name='name' className='inputs' required/>
        </div>
        <div className=''>
        <input type='email' placeholder='Adresse e-mail' name='email' className='inputs' required/>
        </div>
        <div className=''>
        <input type='password' placeholder='Mot de passe' name='password' className='inputs' required/>
        </div>
        <div className=''>
        <input type='password' placeholder='Confirmer le mot de passe' name='password' className='inputs' required/>
        </div>
        <div className="input-check"><input type="checkbox" className="checkbox1"/> <p>J'accepte les <span className="check-span">conditions générales</span></p></div>
        <button type='submit' className='btn btn-successe w-100 rounded-0'>Créer mon compte</button>
      </form>
      
    </div>
    </div>
  )
}

export default SignUp
