import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Doctor/Dashboard';
import AllApointments from './pages/Admin/Doctor/AllApointments';
import AddDoctor from './pages/Admin/Doctor/AddDoctor';
import DoctorsList from './pages/Admin/Doctor/DoctorsList';

const App = () => {

  const {aToken} = useContext(AdminContext)
  return aToken?(
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllApointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorsList/>}/>
        </Routes>
      </div>
    </div>
  ) :(
    <div >
      <Login/>
      <ToastContainer/>
    </div>
  )
}

export default App