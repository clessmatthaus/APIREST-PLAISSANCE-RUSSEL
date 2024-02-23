import React from 'react'
import {useEffect} from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {getLoginStatus} from "../services/authServices"
import {SET_LOGIN} from "../redux/features/auth/authSlice"
import { toast } from 'react-toastify';

const UseRedirectLogOut = (path) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

useEffect(() => {
   const loggedOutRedirect = async () => {
      const isLoggedIn = await getLoginStatus()
      dispatch (SET_LOGIN(isLoggedIn))

      if(!isLoggedIn) {
        toast.info("session expirée, veuillez vous connecter pour continuer...")
        navigate(path)
        return
      }
   };
   loggedOutRedirect()
}, [navigate, path, dispatch])
}

export default UseRedirectLogOut

