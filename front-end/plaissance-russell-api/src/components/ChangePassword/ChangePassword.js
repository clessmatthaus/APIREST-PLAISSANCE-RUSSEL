import React from 'react'
import "./ChangePassword.css"
import { useState} from "react"
import { toast } from 'react-toastify';
import { changePassword } from '../../services/authServices';

 const initialState = {
        oldPassword: "",
        password: "",
        confirmPassword: "",
      };

const ChangePassword = () => {
    const [formData, setFormData] = useState(initialState);
    const {oldPassword,  password, confirmPassword} = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const changePass = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            return toast.error("Le nouveau mot de passe n'est pas identique")
        }
        const formData = {
            oldPassword,
            password,
        }
        const data = await changePassword(formData)
        toast.success(data)
    }
    
  return (
    <div className="edit-profile-password">
        <h3>Modifier le mot de passe</h3>
        <form onSubmit={changePass}>
          <input className="input-pad" type="password" name="oldPassword" placeholder="Ancien mot de passe" value={oldPassword} onChange={handleInputChange}/>
          <input className="input-pad" type="password" name="password" placeholder="Nouveau mot de passe" value={password} onChange={handleInputChange}/>
          <input className="input-pad" type="password" name="confirmPassword" placeholder="Confirmer mot de passe" value={confirmPassword} onChange={handleInputChange}/>
          <div className="send-btn"><button className="btn btn-primary">Réinitialiser le mot de passe</button></div>       
        </form>
    </div>
  )
}

export default ChangePassword
