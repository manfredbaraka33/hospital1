import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FaArrowAltCircleRight, FaArrowRight, FaBars, FaChartBar, FaLine } from 'react-icons/fa';
import { FaBarsProgress, FaFileImport, FaHouse } from 'react-icons/fa6';

const Navbar = () => {
   const {user}=useAuth();
   const handleImport=()=>{
    alert("This function is not availabe for now!")
   }
  return (
    <nav className='nav-bar fixed-top bg-dark text-light'>
        <div className="nav-bar-brand"><Link style={{textDecoration:"none",color:"yellow"}} to='/home'>Hospital1</Link></div>
        <div className='mx-1'>
              <Link  to="/profile">
                <img className="rounded-circle" style={{ width: "30px", height: "30px" }} src="/download.jpg" alt={user?.username} />
              </Link>
              <Link  style={{textDecoration:"none",color:"white"}} className='mx-2 email' to="/profile"><span>{user?.email}</span></Link>
            </div>
        
        <div className="nav-bar-links">
          <div style={{ display: "flex" }}>  
           
            
            <div className='mx-2'>
                <Link  style={{textDecoration:"none"}} to="/">
                  <span className="btn btn-outline-light"><FaArrowAltCircleRight  /> <span className='lo'>Logout</span> </span> 
                </Link>
            </div>           
          </div> 
      </div>
    </nav>
  )
}

export default Navbar
