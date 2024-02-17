import './App.css';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Catways from './pages/Catways';
import Reservations from './pages/Reservations';
import Auth from './pages/Auth';

function App() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Auth/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/catways' element={<Catways/>} />
          <Route path='/reservations' element={<Reservations/>} />
        </Routes>
    </div>
  )
  }
export default App

