import React from 'react'
import axios from 'axios'
import { toast } from "react-toastify"


export const API_URL = process.env.REACT_APP_API_URL;

export const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

//register user
export const registerUser = async (userData) => {

    try {
        const response = await axios.post(`${API_URL}/api/users/register`, userData, {withCredentials: true})
        if(response.statusText === "OK") {
            toast.success("Utilisateur enregistré avec succès...")
        }
        return response.data
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.messsage) || error.message || error.toString();
        toast.error(message)
    }
};

//login user
export const loginUser = async (userData) => {

    try {
        const response = await axios.post(`${API_URL}/api/users/login`, userData);
        if(response.statusText === "OK") {
            toast.success("Connexion réussie...")
        }
        return response.data
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.messsage) || error.message || error.toString();
        toast.error(message)
    }
}

//logout user
export const logoutUser = async () => {

    try {
        await axios.get(`${API_URL}/api/users/logout`);
        
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.messsage) || error.message || error.toString();
        toast.error(message)
    }
}

//forgot password
export const forgotPassword = async (userData) => {

    try {
        const response = await axios.post(`${API_URL}/api/users/forgotpassword`, userData);
        toast.success(response.data.message);
        
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.messsage) || error.message || error.toString();
        toast.error(message)
    }
}

//reset password
export const resetPassword = async (userData, resetToken) => {

    try {
        const response = await axios.put(`${API_URL}/api/users/resetpassword/${resetToken}`, userData);
        return response.data;
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.messsage) || error.message || error.toString();
        toast.error(message)
    }
}

//get login status
export const getLoginStatus = async () => {

    try {
        const response = await axios.get(`${API_URL}/api/users/connected`);
        return response.data;
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.messsage) || error.message || error.toString();
        toast.error(message)
    }
}