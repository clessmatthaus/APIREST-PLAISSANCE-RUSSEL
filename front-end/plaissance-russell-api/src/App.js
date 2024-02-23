import './App.css';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Catways from './pages/Catways';
import Forgot from './components/Log/Forgot';
import Sidebar from './components/Sidebar/Sidebar';
import LayoutAside from './components/LayoutAside/LayoutAside';
import Reset from './components/Log/Reset';
import index from './components/Log/index';
import Reservations from './pages/Reservations';
import DashBoardContent from './pages/DashBoardContent';
import Auth from './pages/Auth';
import  axios  from 'axios';
import {useEffect} from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {getLoginStatus} from "./services/authServices"
import {SET_LOGIN} from "./redux/features/auth/authSlice"

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
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/catways' element={<Catways/>} />
          <Route path='/reservations' element={<Reservations/>} />

          <Route path='/dashboardcontent' 
          element={
          <Sidebar>
            <LayoutAside>
              <DashBoardContent />
            </LayoutAside>
          </Sidebar>
                   } />
        </Routes>
    </div>
  )
  }
export default App

