import React from 'react'
import icon from '@/ultils/icon' 

const {FaBars} = icon

function Header() {
  return (
    <div className='w-full h-[40px]'>
      <div>
        <span><FaBars/></span>
      </div>
      <div>ok</div>
    </div>
  )
}

export default Header