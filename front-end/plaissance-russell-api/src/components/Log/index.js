import React from 'react'
import {useState} from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import index from './Index.css';
import { NavLink } from 'react-router-dom';
import { ShowOnLogout, ShowOnLogin } from '../Hidden/HiddenLinks';

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
            <ShowOnLogout>
            <li onClick={handleModal} id="login" className={signInModal ? "li-btn1" : null}>Se connecter</li>
            </ShowOnLogout>
            <ShowOnLogout>
              <li onClick={handleModal} id="register" className={signUpModal ? "li-btn2" : null}>Créer un compte Admin</li>
            </ShowOnLogout>
            <ShowOnLogin>
            <li>
            <div className="li-cont">
              <button className='li-btn dash'>
                <NavLink to="/dashboard" className='no-deco'>Aller sur le Dashboard</NavLink>
              </button>
              </div>
            </li>
            </ShowOnLogin>
          </ul>
        </div>
        <ShowOnLogout>{signInModal && <SignIn />}</ShowOnLogout>
        <ShowOnLogout>{signUpModal && <SignUp />}</ShowOnLogout>
      </div>
    </div>
  )
}

export default Index;
