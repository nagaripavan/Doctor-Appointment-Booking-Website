import React, { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyProfile = () => {

  const {backendUrl,token} = useContext(AppContext)

  const [userData,setUserData]=useState({
    name:'muthyam',
    image:assets.profile_pic,
    phone:'+91 000 000 0000',
    email:'muthyam01@gmail.com',
    address:{
      lane1:'kondapur',
      lane2:'hyderabad'
    },
    gender:'male',
    birthday:'01-01-2000'

  })

  const [isEdit,setIsEdit]=useState(false)


  const updateProfile = async () => {
    try {
      const { data } = await axios.put(
        backendUrl + '/api/user/update-profile',
        {
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          gender: userData.gender,
          dob: userData.dob
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }



  return (
    <div className='my-10 mx-5'>
      <div className='my-5'>
        <img className='w-full md:max-w-1/7 rounded-2xl' src={userData.image} alt="" />
      </div>
      <div className='text-3xl font-semibold my-3'>
        {
          isEdit?
          <input type="text"  value={userData.name} onChange={e=>setUserData(prev=>({...prev,name:e.target.value}))} />:
          <p>{userData.name}</p>
        }
      </div>
      <hr className='md:w-120 opacity-30' />
      <div className='my-5'>
        <p className='text-gray-700 underline mb-4'>CONTACT INFORMATION</p>
        <p className='text-sm mb-2 flex'><span className='font-bold mr-3'>Email id:</span> 
        {
          isEdit?
          <input className='text-blue-500' type="text" value={userData.email} onChange={e=>setUserData(prev=>({...prev,email:e.target.value}))} />:
          <p className='text-blue-500'>{userData.email}</p>
        }
        </p>
        <p className='text-sm mb-2 flex'><span className='font-bold mr-5'>Phone:</span> 
        {
          isEdit?
          <input type="text" className='text-blue-500' value={userData.phone} onChange={e=>setUserData(prev=>({...prev,phone:e.target.value}))} />:
          <p className='text-blue-500'>{userData.phone}</p>
        }
        </p>
        <p className='text-sm mb-2 flex'><span className='font-bold mr-3'>Address:</span> 
        {
          isEdit?
          <input type="text" className='text-gray-600' value={userData.address.lane1} onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,lane1:e.target.value}}))} />:
          <p className='text-gray-600'>{userData.address.lane1}</p>
        },
        {
          isEdit?
          <input type="text" className='text-gray-600' value={userData.address.lane2} onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,lane2:e.target.value}}))} />:
          <p className='text-gray-600'>{userData.address.lane2}</p>
        }
        </p>
      </div>
      <div className='mb-8'>
        <p className='text-gray-700 underline mb-2'>BASIC INFORMATION</p>
        <p className='text-sm mb-2 flex'><span className='font-bold mr-5'>Gender:</span>
        {
          isEdit?
          <select value={userData.gender} onChange={(e)=>setUserData(prev=>({...prev,gender:e.target.value}))} >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>:
          <p>{userData.gender}</p>
        }
        </p>
        <p className='text-sm mb-2 flex'><span className='font-bold mr-3'>Birthday:</span>
        {
          isEdit?
          <input type="date" value={userData.birthday} onChange={e=>setUserData(prev=>({...prev,birthday:e.target.value}))} />:
          <p>{userData.birthday}</p>
        }
        </p>
      </div>
      {
        isEdit ?
        <button onClick={()=>setIsEdit(false)} className='border border-blue-600 py-2 px-10 rounded-full cursor-pointer font-semibold hover:bg-[#5f6FFF] hover:text-white'>Save information</button>:
        <button onClick={()=>setIsEdit(true)} className='border border-blue-600 py-2 px-10 rounded-full cursor-pointer font-semibold hover:bg-[#5f6FFF] hover:text-white'> Edit</button>
      }
    </div>
  )
}

export default MyProfile