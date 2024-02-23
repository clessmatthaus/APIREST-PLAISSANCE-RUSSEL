import './App.css';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddCatway from './pages/Catway/AddCatway';
import CatwayForm from './components/CatwayForm/CatwayForm';
import Forgot from './components/Log/Forgot';
import Reset from './components/Log/Reset';
import index from './components/Log/index';
import Reservations from './pages/Reservations';
import Auth from './pages/Auth';
import  axios  from 'axios';
import {useEffect} from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {getLoginStatus} from "./services/authServices"
import {SET_LOGIN} from "./redux/features/auth/authSlice"
import Layout from './components/layout/Layout';
import Sidebar from './components/Sidebar/Sidebar';


axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch()

  useEffect(()=> {
     async function loginStatus() {
      const status = await getLoginStatus()

      dispatch(SET_LOGIN(status))
     }
     loginStatus()
  }, [dispatch])

  return (
    <div>
      <ToastContainer />
        <Routes>    
          <Route path='/' element={<Auth/>} />
          <Route path='/login' element={<index/>} />
          <Route path='/forgot' element={<Forgot/>} />
          <Route path='/resetpassword/:resetToken' element={<Reset/>} />
          <Route path='/reservations' element={<Reservations/>} />
          <Route path='/catwayform' element={<AddCatway/>} />
        <Route
          path="/dashboard"
          element={  
           
               <Layout><Sidebar>
                <Dashboard />
               </Sidebar> </Layout>
             
          }
        />
        <Route
          path="/add-catway"
          element={
                
                  <Layout><Sidebar>
                <AddCatway />
                 </Sidebar> </Layout>
              
             
          }
        />

        </Routes>
    </div>
  )
  }
export default App

