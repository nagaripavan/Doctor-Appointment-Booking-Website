import React, { useState } from 'react'

const Login = () => {

  const [state,setState]=useState('sign up')

  const [name,setName]=useState('')
  const [Password,setPassword]=useState('')
  const [email,setEmail]=useState('')

  return (
    <form className='flex justify-center'>
      <div className='border border-gray-200 shadow-lg w-max my-20 rounded-2xl p-8 mx-10'>
        <p className='text-2xl font-semibold text-gray-700 mb-4'>{state === 'sign up'?'Create Account':'Login'}</p>
        <p className='text-sm mb-4 text-gray-600'>Please {state === 'sign up'?'sign up':'Login'} to book appointment</p>
        {state === 'sign up'?
            <div>
          <p className='text-sm text-gray-600 font-semibold'>Full Name</p>
          <input className='border border-gray-300 mt-2 mb-5 px-3 py-1 rounded-l w-80' type="text" onChange={(e)=>setName(e.target.name)} value={name} required/>
        </div>:<div></div>      
        }
        <div>
          <p className='text-sm text-gray-600 font-semibold'>Email</p>
          <input className='border border-gray-300 mt-2 mb-5 px-3 py-1 w-80 rounded-l' type="text" onChange={(e)=>setEmail(e.target.name)} value={email} required/>
        </div>
        <div>
          <p className='text-sm text-gray-600  font-semibold'>Password</p>
          <input className='border border-gray-300 mt-2 mb-5 px-3 py-1 w-80 rounded-l' type="text" onChange={(e)=>setPassword(e.target.name)} value={Password} required/>
        </div>
        <button className={`bg-[#5f6FFF] text-white ${state === 'sign up'?'px-26':'px-35'} rounded-l py-2 cursor-pointer font-semibold mb-3`}>{state === 'sign up'?'Create Account':'Login'}</button>

        <div className='text-sm'>
          {state === 'sign up'?
        <p>Already have an account? <span onClick={()=>setState('login')} className='text-blue-600 underline cursor-pointer'  >Login here</span></p>:
        <p>Create an new account? <span onClick={()=>setState('sign up')} className='text-blue-600 underline cursor-pointer'>Click here</span></p>}
        </div>
      </div>
    </form>
  )
}

export default Login