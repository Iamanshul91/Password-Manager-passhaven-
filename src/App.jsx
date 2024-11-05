import { useState } from 'react'
import Navbar from './component/Navbar'
import Manager from './component/Manager'
import Footer from './component/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-full w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1.5px)] bg-[size:20px_20px]'>
      <Navbar/>
      <Manager/>
      <Footer/>
    </div>
  )
}

export default App
