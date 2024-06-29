import React, { useEffect, useState } from 'react'
import url from './url'
import axios from 'axios'

function MainComponent() {
  const [status,setStatus]=useState('')
  const [loggedIn,setLoggedIn]=useState(true)
  const [cartData,setCartData]=useState([])
  const [totalCost,setTotalCost]=useState(0)
  const login = (e) => {
    e.preventDefault()
    const obj = {
        u_name: e.target.uname.value,
        u_pwd: e.target.upwd.value
    }
    axios.post(url+'/user/login', obj)
        .then((posRes) => {
            console.log(posRes.data)
            if(posRes.data.auth==='success'){
              setLoggedIn(true)
              setStatus('Login Success')
              window.sessionStorage.setItem('uname',obj.u_name)
              window.sessionStorage.setItem('u_token',posRes.data.token)
              fetchCart()
              setTimeout(()=>{
                setLoggedIn(true)
              },1000)
            }
            else{
              setStatus('User or Password Error')
            }
        }, (errRes) => {
            setStatus(errRes.message)
        })
  }
  useEffect(()=>{
    if(window.sessionStorage.length==2) setLoggedIn(true)
    else setLoggedIn(false)
  },[])
  const fetchCart =()=>{
    axios.get(url+'/cart/fetchCart?u_name='+window.sessionStorage.getItem('uname'))
      .then((posRes)=>{
        // console.log(posRes)
        setCartData(posRes.data)
      },(errRes)=>{
        console.log(errRes)
      })
  }
  if(!loggedIn){
    return (
      <div>
        <form onSubmit={login}>
        <div className='grid w-1/4 mx-auto gap-3 mt-5'>
            <h1 className='text-3xl tracking-widest mx-auto mb-2'>login</h1>
            <input name='uname' className=' text-lg tracking-wide outline-none placeholder:text-white bg-gray-400 text-black rounded-md py-2 px-4'
            placeholder='Enter username' type='text'  />
            <input name='upwd' className=' text-lg tracking-wide outline-none placeholder:text-white bg-gray-400 text-black rounded-md py-2 px-4'
            placeholder='Enter password' type='password' />
            <button type='submit' className=' text-white hover:bg-cyan-800 shadow-md hover:shadow-xl bg-cyan-600 py-1 rounded-lg'  >submit</button>
            <h2 className={` text-center${status=='Login Success'?' text-green-700':' text-red-700'}`}>{status}</h2>
        </div>
          </form> 
      </div>
    )
  }else if(cartData.length>0){
    return (
      <div className=' scroll-m-0 p-4'>
        {cartData.map((e,i)=>(
          <div className=' rounded-lg shadow-lg bg-slate-200 p-4 w-1/3 tracking-wide grid grid-cols-3'>
            <img className=' rounded-xl w-28' src={e.p_img} />
            <div className=' col-span-2'>
              <h2 className=' my-2 text-2xl'>{e.p_name}</h2>
              <h2 className=' text-lg font-semibold'>{e.p_cost}</h2>
              <span>quantity : {e.p_count}</span>

            </div>
          </div>
        ))}
        <div></div>
      </div>
    )
  }else{
    return (
      <div className='text-center my-20'>
        <h1 className='mb-8 tracking-widest text-5xl'>Cart is Empty</h1>
        <h2 className=' text-slate-500 tracking-wider'>Add any item to cart to see here</h2>
      </div>
    )
  }
}
export default MainComponent