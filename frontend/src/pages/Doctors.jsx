import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { doctors } from '../assets/assets'

const Doctors = () => {
  const {speciality}=useParams()
  const [filterDoc,setFilterDoc]=useState([])
  const {Doctors} =useContext(AppContext)
  
  const navigate=useNavigate()

  const applyFilter = ()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc=>doc.speciality === speciality ))
    }else{
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{applyFilter()},[speciality,doctors])

  return (
    <div>
        <p className='mx-1'> Browse through the doctors specialist.</p>
        <div className='flex flex-row gap-8 my-8'>
          <div className='flex flex-col'>
            <p onClick={()=>speciality === 'General physician' ? navigate('/doctors') : navigate(`/doctors/General physician`)} className={`border cursor-pointer border-gray-300 w-45 rounded-l mb-3 px-3 py-2 text-sm ${speciality === 'General physician' ? 'bg-indigo-100 text-black':""}`}>General physician</p>
            <p onClick={()=>speciality === 'Gynecologist' ? navigate('/doctors') : navigate(`/doctors/Gynecologist`)} className={`border cursor-pointer border-gray-300 w-45 rounded-l mb-3 px-3 py-2 text-sm ${speciality === 'Gynecologist' ? 'bg-indigo-100 text-black':""}`}>Gynecologist</p>
            <p onClick={()=>speciality === 'Dermatologist' ? navigate('/doctors') : navigate(`/doctors/Dermatologist`)} className={`border cursor-pointer border-gray-300 w-45 rounded-l mb-3 px-3 py-2 text-sm ${speciality === 'Dermatologist' ? 'bg-indigo-100 text-black':""}`}>Dermatologist</p>
            <p onClick={()=>speciality === 'Pediatricians' ? navigate('/doctors') : navigate(`/doctors/Pediatricians`)} className={`border cursor-pointer border-gray-300 w-45 rounded-l mb-3 px-3 py-2 text-sm ${speciality === 'Pediatricians' ? 'bg-indigo-100 text-black':""}`}>Pediatricians</p>
            <p onClick={()=>speciality === 'Neurologist' ? navigate('/doctors') : navigate(`/doctors/Neurologist`)} className={`border cursor-pointer border-gray-300 w-45 rounded-l mb-3 px-3 py-2 text-sm ${speciality === 'Neurologist' ? 'bg-indigo-100 text-black':""}`}>Neurologist</p>
            <p onClick={()=>speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate(`/doctors/Gastroenterologist`)} className={`border cursor-pointer border-gray-300 w-45 rounded-l mb-3 px-3 py-2 text-sm ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black':""}`}>Gastroenterologist</p>
          </div>
          <div className=' grid grid-cols-4 gap-4 '>
            {
              filterDoc.map((item,index)=>(
                    <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 cursor-pointer rounded-2xl bg-[#EAEFFF] overflow-hidden hover:translate-y-[-10px] transition-all duration-500'>
                        <img className='' src={item.image} alt="" />
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
        </div>
    </div>
  )
}

export default Doctors