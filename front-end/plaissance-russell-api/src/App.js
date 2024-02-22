import './App.css';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Catways from './pages/Catways';
import Forgot from './components/Log/Forgot';
import Sidebar from './components/Sidebar/Sidebar';
import LayoutAside from './components/LayoutAside/LayoutAside';
import Reset from './components/Log/Reset';
import Reservations from './pages/Reservations';
import DashBoardContent from './pages/DashBoardContent';
import Auth from './pages/Auth';


function App() {
  return (
    <div>
        <Routes>    
          <Route path='/' element={<Auth/>} />
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

