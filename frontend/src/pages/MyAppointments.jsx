import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext'

const MyAppointments = () => {

  const {doctors} = useContext(AppContext)

  return (
    <div className='mx-5'>
      <p className='text-lg mt-10 mb-5 text-gray-600 font-semibold'>My Appointments</p>
      <hr className='opacity-20'/>
      <div className=''>
        {
          doctors.slice(0,2).map((item,index)=>(
            <div className='flex flex-col md:flex-row gap-5 pb-10 border-b border-b-gray-300 py-4' key={index}>
              <div className=''>
                <img className=' bg-indigo-100 w-full md:max-w-[150px]' src={item.image} alt="" />
              </div>
              <div className='text-sm flex flex-col gap-2'>
                <p className='font-semibold text-lg'>{item.name}</p>
                <p>{item.speciality}</p>
                <div>
                  <p className='font-semibold'>Address:</p>
                  <p>{item.address.line1}</p>
                  <p>{item.address.line2}</p>
                </div>
                <p><span className='font-semibold mr-2'>Date & Time:</span>25 Oct 2025 | 10:30 AM</p>
              </div>
              <div className='flex flex-col pt-5 md:pt-15 gap-3 md:ml-auto text-sm text-gray-600'>
                <button className='border border-gray-300 py-2 px-15 hover:bg-[#5f6FFF] hover:text-white rounded-sm transition duration-200'>Pay Online</button>
                <button className='border border-gray-300 py-2 px-15 hover:bg-red-700 hover:text-white rounded-sm transition duration-200'>Cancel Appointment</button>
              </div>
            </div>
            
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments