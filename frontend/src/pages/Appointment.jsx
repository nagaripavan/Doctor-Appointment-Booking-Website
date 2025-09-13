import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Appointment = () => {

  const {docId} = useParams()
  const {doctors} = useContext(AppContext)
  const [docInfo,setDocInfo]=useState(null)
  
  const fetchInfo=async()=>{
    const docInfo = doctors.find(doc=>doc._id === docId)
    setDocInfo(docInfo)
    console.log(docInfo)
  }

  useEffect(()=>{ fetchInfo()},[docId,doctors])

  return docInfo &&(
    <div>
        <div className='flex flex-col sm:flex-row gap-4 my-5  '>
          <div >
              <img className='bg-[#5f6FFF] w-full rounded-lg ' src={docInfo.image} alt="" />
          </div>
          <div className='flex-1 border border-gray-400 rounded-lg p-8 '>
            <h1 className='flex gap-2 text-3xl font-semibold'>{docInfo.name } <img className='py-1.5' src={assets.verified_icon} alt="" /></h1>
            <div className='flex gap-2 pt-2 pb-5'>
              <p>{docInfo.degree}</p>
              <p>-</p>
              <p>{docInfo.speciality}</p>
              <p className='border border-gray-400 rounded-full px-2 text-sm'>{docInfo.experience}</p>
            </div>
            <p className='font-semibold flex gap-2'>about <img src={assets.info_icon} alt="" /></p>
            <p className='mb-5 mt-3 text-sm max-w-full'>{docInfo.about}</p>
            <div className='flex gap-1 '>
              <p className='text-gray-800'>Appointment fee:  </p><p className='font-semibold'> ₹ {docInfo.fees*4} </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Appointment