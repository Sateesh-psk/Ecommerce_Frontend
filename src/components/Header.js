import React, { useState } from 'react'
import {BrowserRouter as Router, NavLink, Routes, Route} from 'react-router-dom'
import ReadComponent from './IndexComponent'
import Aboutus from './Aboutus'
import Contactus from './Contactus'
import MainComponent from './MainComponent'
import { useEffect } from 'react'
import Signup from './Signup'
function Header() {
  const [loggedIn,setLoggedIn] = useState(false)
  useEffect(()=>{
    if(window.sessionStorage.length==0 ||window.sessionStorage.uname==='') setLoggedIn(false)
    else setLoggedIn(true)
  })

  let handleLogout = ()=>{
    if(window.sessionStorage.length<2) alert('You are already logged out')
    else{
      window.sessionStorage.clear()
      alert('You are successfully logged out'
      )
    }
  }

  return (
    <div>
      <Router>
        <nav className=' text-lg tracking-wide p-2 bg-gradient-to-tl to-slate-300 from-blue-300 z-50  sticky top-0 grid grid-cols-4'>
          <h1 className=' col-span-1 text-4xl'>ShopKaro</h1>
          <div className=' col-span-2 grid grid-flow-col'>
            <button><NavLink to='/'>Home</NavLink></button>
            <button><NavLink to='/about'>About</NavLink></button>
            <button><NavLink to='/signup'>Signup</NavLink></button>
          </div>
          <div className='grid grid-cols-2'>
            <button className=''><NavLink to='/cart'>cart</NavLink></button>
            {<button onClick={()=>handleLogout()} className=' hover:bg-orange-700 text-white rounded-lg bg-orange-400 p-2'>log-out</button>}
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<ReadComponent />}></Route>
            <Route path='/about' element={<Aboutus />}></Route>
            <Route path='/contact' element={<Contactus />}></Route>
            <Route path='/cart' element={<MainComponent />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default Header