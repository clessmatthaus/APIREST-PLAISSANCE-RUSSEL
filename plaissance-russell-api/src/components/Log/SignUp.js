import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Index from './Index.css';

function SignUp() {
  return (
    <div>
    <h2>Créer votre compte</h2>
    <div className='d-flex vh-100 justify-content-center form-i'>
      <form>
      <div className='mb-3'>
        <input type='name' placeholder='Pseudo' name='name' className='inputs' required/>
        </div>
        <div className='mb-3'>
        <input type='email' placeholder='Adresse e-mail' name='email' className='inputs' required/>
        </div>
        <div className='mb-3'>
        <input type='password' placeholder='Mot de passe' name='password' className='inputs' required/>
        </div>
        <div className='mb-3'>
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
