import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Profile from './pages/Profile'
import { AuthProvider } from './contexts/AuthContext'
import PatientReg from './pages/PatientReg'
import PatientDetails from './pages/PatientDetails'

function App() {
 

  return (
    <>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />}/>
        <Route path='/patientreg' element={<PatientReg />}/>
        <Route path='/patient_details/:patient_id' element={<PatientDetails />}/>

      </Routes>
      </AuthProvider>
    </>
  )
}

export default App
