import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const MyAppointments = () => {

  const {backendUrl,token,getDoctorsData } = useContext(AppContext)
  const [appointments,setAppointments] = useState([])
  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
  }

  const getUserAppointments = async()=>{
    try {
      
      const {data} = await axios.get(backendUrl+'/api/user/appointments',{headers:{ Authorization: `Bearer ${token}`}})


      if (data.success) {
        setAppointments([...data.appointments].reverse())
        console.log(data.appointments)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  const cancelAppointment = async(appointmentId)=>{
    try {
      
      const {data} = await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{ Authorization: `Bearer ${token}`}})

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='mx-5'>
      <p className='text-lg mt-10 mb-5 text-gray-600 font-semibold'>My Appointments</p>
      <hr className='opacity-20'/>
      <div className=''>
        {
          appointments.length === 0 && (
            <p className="text-gray-500 mt-5">No appointments found</p>
          )
        }
        {
          appointments.map((item,index)=>(
            <div className='flex flex-col md:flex-row gap-5 pb-10 border-b border-b-gray-300 py-4' key={index}>
              <div className=''>
                <img className=' bg-indigo-100 w-full md:max-w-[150px]' src={item.docData.image} alt="" />
              </div>
              <div className='text-sm flex flex-col gap-2'>
                <p className='font-semibold text-lg'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <div>
                  <p className='font-semibold'>Address:</p>
                  <p>{item.docData.address.line1}</p>
                  <p>{item.docData.address.line2}</p>
                </div>
                <p><span className='font-semibold mr-2'>Date & Time:</span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div className='flex flex-col pt-5 md:pt-15 gap-3 md:ml-auto text-sm text-gray-600'>
                {!item.cancelled &&  <button className='border border-gray-300 py-2 px-15 hover:bg-[#5f6FFF] hover:text-white rounded-sm transition duration-200 cursor-pointer'>Pay Online</button>}
                {!item.cancelled &&  <button onClick={()=>cancelAppointment(item._id)} className='border border-gray-300 py-2 px-15 hover:bg-red-700 hover:text-white rounded-sm transition duration-200 cursor-pointer'>Cancel Appointment</button>}
                {item.cancelled && <button className='border border-gray-300 py-2 px-15 text-red-600 transition duration-200'>Appointment cancelled</button>}
              </div>
            </div>
            
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments