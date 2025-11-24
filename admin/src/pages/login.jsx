import React, { useState } from 'react'
import { assets } from '../../../frontend/src/assets/assets.js'

const Login = () => {

  const [state,setState] = useState('Admin')

  return (
    <form className='flex justify-center'>
      <div className='border border-gray-200 shadow-lg w-max my-45 rounded-2xl p-8 mx-10'>
        <p className='text-2xl font-semibold text-gray-700 mb-4  flex flex-row gap-2 justify-center'><span className='text-[#5f6FFF]'>{state}</span>login</p>
        <div>
          <p className='text-sm text-gray-600 font-semibold'>Email</p>
          <input className='border border-gray-300 mt-2 mb-5 px-3 py-1 w-80 rounded-l' type="email" required />
        </div>
        <div>
          <p className='text-sm text-gray-600 font-semibold' >Password</p>
          <input className='border border-gray-300 mt-2 mb-5 px-3 py-1 w-80 rounded-l' type="password" required />
        </div>
        <button className='bg-[#5f6FFF] text-white px-35 rounded-l py-2 cursor-pointer font-semibold mb-3 '>Login</button>
        <div className='text-sm'>
          {state === 'Admin'?
        <p>Doctor Login? <span onClick={()=>setState('Doctor')} className='text-blue-600 underline cursor-pointer'  >Login here</span></p>:
        <p>Admin Login? <span onClick={()=>setState('Admin')} className='text-blue-600 underline cursor-pointer'>Click here</span></p>}
        </div>
      </div>
      
    </form>
  )
}

export default Login