import React from 'react'
import { useEffect,useState } from 'react';
function Signup() {
  let [loggedIn,setLoggedIn]=useState(true);

  useEffect(()=>{
    if(window.sessionStorage.length==2) setLoggedIn(true)
      else setLoggedIn(false)
  },[])

  if(loggedIn){
    return (
      <div className='text-center mt-20'>
        <h2 className=' tracking-wider text-5xl mb-8'>You have already Signed Up</h2>
        <h2 className=' text-slate-500 tracking-wider'>please logout to add new account</h2>
      </div>
    )
  }else{
    return (
      <div>
        <h2>Please enter details</h2>
      </div>
    )
  }
}

export default Signup