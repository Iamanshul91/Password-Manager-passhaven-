import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#5D4F8E] justify-between font-mono text-[18px]'>
        <div className="md:mycontainer flex justify-between items-center px-4 py-2">

        <div className='font-bold text-white'>PassHaven<span className='font-extrabold text-[#001F3F]'>/..\</span></div>
        <ul>
          <li className='flex items-center gap-2 cursor-pointer px-2 border-[2px] border-[#001F3F] rounded'>
            <img className='size-5' src="icons/github.png" alt="" />
            <a className=' text-white' href="https://github.com/Iamanshul91" target='_blank'>Github</a>
          </li>
        </ul>
        </div>
      </nav>
  )
}

export default Navbar
