import React from 'react'
import axios from 'axios'
import url from './url'
import { addToCart } from './MainComponent'
export default class ReadComponent extends React.Component{
  constructor(){
    super()
    this.state={
      products:[],
      status:''
    }
  }
  componentDidMount(){
    this.setState({
      status:'Loading..'
    })
    let test = axios.get(url+'/products/fetch')
      .then((posRes)=>{
        this.setState({
          products: posRes.data,
          status:''
        })
      },(errRes)=>{
        console.log(errRes)
      })
  return test
  }

  render(){
    return (
      <div className='mt-5 grid grid-cols-4 gap-3 mx-3'>
        {this.state.products.map((element,index)=>(
        <div className={` shadow-lg hover:scale-105 hover:shadow-2xl trnasition ease-in-out duration-300
            p-2  rounded-xl bg-gradient-to-b from-slate-200 to-slate-400 grid`}>
              <div className=' h-96'>
                <img className='rounded-lg w-64 mx-auto' src={element.p_img} />
                <h2 className={` text-center text-2xl font-semibold tracking-wider my-2`}>{element.p_name}</h2>
                <h5 className=' text-xl pl-5 tracking-wider'>₹ {element.p_cost}</h5>
                <h3 className=' text-slate-600'>{element.p_desc}</h3>
              </div>
              <div className='grid grid-cols-2'>
                <button className={` text-lg border-r-0 transition duration-300 rounded-l-lg border-green-600 border-2 w-full
                    hover:bg-green-600 text-green-100 hover:text-white py-2`}
                    >add to cart</button>
                <button className={` text-lg border-l-0 transition duration-300 rounded-r-lg border-blue-600 border-2 w-full
                    hover:bg-blue-600 text-blue-100 hover:text-white py-2`}>buy now</button>
              </div>
            </div>
          ))}
        <div className='text-center'>{this.state.status && <div className='spinner-border'></div>}</div>
      </div>
    )
  }
}