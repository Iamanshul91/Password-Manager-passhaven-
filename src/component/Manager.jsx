import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

const Manager = () => {



    const ref = useRef()
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        let passwords = localStorage.getItem('passwords')
        if (passwords) {
            // console.log(JSON.parse(passwords))
            setpasswordArray(JSON.parse(passwords));
        }
    }, [])



    const showPassword = () => {
        // alert("Show the password")
        if (ref.current.src.includes('icons/eye.png')) {
            ref.current.src = 'icons/hidden.png'
            passwordRef.current.type = 'text'
        }
        else {
            ref.current.src = 'icons/eye.png'
            passwordRef.current.type = 'password'
        }
    }
    const savePassword = (e) => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 4){
            setIsClicked(true);
            setTimeout(() => setIsClicked(false), 100);
            setpasswordArray([...passwordArray, {...form,id:uuidv4()}])
            localStorage.setItem('passwords', JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
            setform({site: "", username: "", password: ""});
        }
        else{
            alert("Please insert valid input length")
        }
        // console.log([...passwordArray, form])
        // alert("Password Saved SuccessFully")
    }

    const deletePassword = (id) => {
        // console.log("deleting the password id "+ id)
        setpasswordArray(passwordArray.filter(item => item.id !== id));
        localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item => item.id !== id)));        
    }
    const editPassword = (id) => {
        setform(passwordArray.filter(item => item.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id));      
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }
    


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className='absolute top-0 h-full w-full z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1.5px)] bg-[size:20px_20px]'></div>
            
            <div className='font-mono mycontainer bg-[#C0C0C0] mt-4 rounded-[4px] flex flex-col items-center'>
                <h1 className="text-2xl flex flex-col items-center">
                    <div className='font-bold text-[#001F3F] flex items-center justify-center'>PassHaven<span className='font-extrabold text-[#001F3F]'>/..\</span></div>
                    <p className='font-normal text-sm'>Your passwords, securely stored</p>
                </h1>
                <div className='my-8 w-full'>
                    <input value={form.site} onChange={handleChange} className='w-full rounded border-[2px] border-[#001F3F] px-1 py-1 font-semibold outline-[#8576bd]' type="text" placeholder='Enter website URL' name='site' />
                    <div className='mt-4 w-full flex justify-between gap-4 flex-col md:flex-row'>
                        <input value={form.username} onChange={handleChange} className='w-full md:w-3/4 rounded border-[2px] border-[#001F3F] px-1 py-1 font-semibold outline-[#8576bd]' type="text" placeholder='Enter username' name='username' />
                        <div className="relative w-full md:w-1/2">
                            <span onClick={showPassword} className="absolute right-2 bottom-[0.22rem]"><img ref={ref} className='size-7 cursor-pointer' src="icons/eye.png" alt="" /></span>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='w-full rounded border-[2px] border-[#001F3F] px-1 py-1 font-semibold outline-[#8576bd]' type="password" placeholder='Enter password' name='password' />
                        </div>
                    </div>
                </div>
                
                <button onClick={savePassword} className='flex justify-center items-center w-fit bg-[#8576bd] border-[1px] border-[#001F3F] px-2 py-1 rounded-full hover:bg-[#4f3f88] transition-all ease-in duration-150 font-bold text-sm' style={{
                    transform: isClicked ? 'scale(0.95)' : 'scale(1)',
                    transition: 'transform 0.1s ease',
                }}>

                    <lord-icon
                        src="https://cdn.lordicon.com/sbnjyzil.json"
                        trigger="hover"
                        colors="primary:#000000,secondary:#000000"
                        stroke="bold"
                    >
                    </lord-icon>
                    Add Password
                </button>
            </div>
            <div className='min-h-[30rem] overflow-x-auto font-mono mycontainer bg-[#C0C0C0] my-4 rounded-[4px] pb-10'>
                
                <h2 className='font-bold mb-4 text-2xl'>Your Passwords </h2>
                {passwordArray.length === 0 && <div>No Paasswords to Show</div>}
                {passwordArray.length !== 0 && <table className="w-full rounded overflow-hidden">
                    <thead className='bg-[#8576bd]'>
                        <tr className='border-collapse border-2 border-[#4f3f88] h-12 '>
                            <th>Sites</th>
                            <th>Usernames</th>
                            <th>Passwords</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passwordArray.map((item, index) => {
                            return <tr key={uuidv4()} className='border-collapse border border-[#4f3f88] h-12 '>
                                <td className='text-center '>
                                    <div className="flex items-center justify-center gap-2 w-max mx-6">
                                        <a href={item.site} target='_blank'>{item.site}</a>
                                        <div className='copyImage' onClick={() => copyText(item.site)}>
                                            <img className='size-6 cursor-pointer' src="icons/copy.png" alt="" />
                                        </div>

                                    </div>
                                </td>
                                <td className='text-center '>
                                    <div className="flex items-center justify-center gap-2 w-max mx-6">
                                        {item.username}
                                        <div className='copyImage' onClick={() => copyText(item.username)}>
                                            <img className='size-6 cursor-pointer' src="icons/copy.png" alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td className='text-center '>
                                    <div className="flex items-center justify-center gap-2 w-max mx-6">
                                        {item.password}
                                        <span className='copyImage' onClick={() => copyText(item.password)}>
                                            <img className='size-6 cursor-pointer' src="icons/copy.png" alt="" />
                                        </span>
                                    </div>
                                </td>
                                <td className='text-center'>
                                    <div className="flex items-center justify-center gap-4 w-max mx-6">
                                        <img className='size-6 cursor-pointer' src="icons/edit.png" alt="" onClick={()=>{editPassword(item.id)}}/>
                                        <img className='size-6 cursor-pointer' src="icons/bin.png" alt="" onClick={()=>{deletePassword(item.id)}}/>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                }
            </div>
        </>
    )
}

export default Manager
