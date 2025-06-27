import React from 'react'

export default function Footer() {
  return (
    <div className='flex items-end justify-between text-navText bg-[#1E293B] h-32 border-t-2 border-gray-500'>
      <div className='flex gap-2.5 items-end'>
        <h4>Terms of use</h4>
        <h4>Privecy Policy</h4>
      </div>
      <div>© 2025 Clin Technologies. All rights reserved.</div>
    </div>
  )
}
