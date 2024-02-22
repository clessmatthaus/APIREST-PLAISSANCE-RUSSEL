import React from 'react'
import {useState} from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import index from './Index.css';
import { NavLink } from 'react-router-dom';

const Index = () => {
  const [signInModal, setSignInModal] = useState(true);
  const [signUpModal, setSignUpModal] = useState(false);
  

  const handleModal = (e) => {
    if(e.target.id === "login") {
      setSignUpModal(false)
      setSignInModal(true)
    }
    else if (e.target.id === "register"){
      setSignUpModal(true)
      setSignInModal(false)
    }
  }
  return (
    <div className='main-section'>
      <div className='form-import'>
        <div className="ul-div">
          <ul>
            <li onClick={handleModal} id="login" className={signInModal ? "li-btn1" : null}>Se connecter</li>
            <li onClick={handleModal} id="register" className={signUpModal ? "li-btn2" : null}>Créer un compte Admin</li>
            <li>
              <button className='li-btn'>
                <NavLink to="/dashboard" className='no-deco'>Dashboard</NavLink>
              </button>
            </li>
          </ul>
        </div>
        {signInModal && <SignIn />}
        {signUpModal && <SignUp />}
      </div>
    </div>
  )
}

export default Index;
