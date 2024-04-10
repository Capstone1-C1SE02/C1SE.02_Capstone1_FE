import React from 'react'
import { Outlet } from "react-router-dom";
import Header from './Header';

function Home() {
  return (
      <div className='w-full h-full'>
          <Header />
          
    </div>
  ) 
}

export default Home