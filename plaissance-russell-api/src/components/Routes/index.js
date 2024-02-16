import React from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Home from '../../pages/Home';
import Dashboard from '../../pages/Dashboard';
import Catways from '../../pages/Catways';
import Reservations from '../../pages/Reservations';

function index() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/catways' element={<Catways/>} />
          <Route path='/reservations' element={<Reservations/>} />
        </Routes>
    </div>
  )
}

export default index

