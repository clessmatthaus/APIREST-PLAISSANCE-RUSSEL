import React from 'react'
import "./Profile.css"
import {useState, useEffect } from "react"
import { useDispatch} from "react-redux"
import useRedirectLogOut from "../../HookDirection/useRedirectLogOut"
import { getUser} from '../../services/authServices';
import { SET_USER, SET_NAME } from '../../redux/features/auth/authSlice';
import { SpinnerImg } from "../../components/Loader/Loader";
import { Link } from "react-router-dom"
import Card from "../../components/Card/Card";

const Profile = () => {
    useRedirectLogOut("/")
    const dispatch = useDispatch()

    const [profile, setProfile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
       setIsLoading(true)
        async function getUserData(){
            const data = await getUser()
        //console.log(data)

        setProfile(data)
        setIsLoading(false)
        await dispatch(SET_USER(data))
        await dispatch(SET_NAME(data.name))
       }
       getUserData()    
    }, [dispatch])

  return (
    <div className="profile-container">
        {isLoading && <SpinnerImg/>}
        <div>
        {!isLoading && profile === null ? (
            <p>Une erreur est survenue, veuillez actualiser la page...</p>
        ): (
          <>
        <Card cardClass={"Card --flex-dir-column"}>
            <div className="profile">
                <div className="profile-img">
                <img src={profile?.photo} alt="profil" width="250px" height="250px"/>
            </div>
            <div className='profile-infos'>
                <h5><label>Nom : </label> <span>{profile?.name}</span></h5>
                <h5><label>E-mail : </label> <span>{profile?.email}</span></h5>
            </div>   
            </div>   
            <div className="update-btn">
            <Link to="/edit-profile"><button className="btn btn-danger">Modifier le profil</button></Link>
            </div>
        </Card>
        </>
        )}
        </div>
    
    </div>
  )
}

export default Profile
