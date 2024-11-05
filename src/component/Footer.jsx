import React from 'react'

const Footer = () => {

  function Heart() {
    return <div className='red ml-1'>{'\u2665'}</div>;
  }

  return (
    <div className='relative bg-[#604ca8] w-full flex justify-center'>

      <div className='text-white flex m-2'>
        Created by Anshul{Heart()}
      </div>
    </div>
  )
}


export default Footer
