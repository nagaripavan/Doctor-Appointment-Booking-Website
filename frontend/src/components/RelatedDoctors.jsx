import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const RelatedDoctors = ({docId,speciality}) => {
    const {doctors}=useContext(AppContext)
    const navigate = useNavigate()
    const [relDoc,setRelDoc]=useState([])

    useEffect(()=>{
      if(doctors.length>0 && speciality){
        const doctorsData=doctors.filter((doc)=>doc.speciality === speciality && doc._id !== docId)
        setRelDoc(doctorsData)
      }
    },[doctors,docId,speciality])
   return(
    <div className='m-10 mt-15'>
        <div className='flex justify-center items-center flex-col'>
            <h1 className='text-black text-3xl font-bold text-center' >Related Doctors</h1>
        <p className='mt-5 mb-6 sm:w-1/2 ml-45  text-sm '>Simply browse through our extensive list of trusted doctors.</p>
        </div>
        <div  className='grid grid-cols-5 gap-4'>
            {
                relDoc.slice(0,6).map((item,index)=>(
                    <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} className='border border-blue-200 cursor-pointer rounded-2xl bg-[#EAEFFF] overflow-hidden hover:translate-y-[-10px] transition-all duration-500'>
                        <img src={item.image} alt="" />
                        <div className='bg-white p-4' key={index}>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p >Available</p>
                            </div>
                            <div>
                                <p className='font-medium text-lg'>{item.name}</p>
                                <p className='opacity-60 text-sm'>{item.speciality}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className='flex justify-center items-center'>
            <button onClick={()=>{navigate('/doctors'),scroll(0,0)}} className='mt-11 cursor-pointer text-center flex justify-center items-center bg-gray-300 rounded-full py-2 px-10 '>More</button>
        </div>
    </div>
  )
}

export default RelatedDoctors