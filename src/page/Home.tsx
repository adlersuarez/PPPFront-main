import Loading from '@/components/Loading';
import { RootState } from '@/store';
import React from 'react'
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Home = () => {
    const {loading} = useSelector((state: RootState) => state.general);
    
  return (
    <div>
{loading && <Loading/>} 
    <Outlet />
    </div>
  )
}

export default Home