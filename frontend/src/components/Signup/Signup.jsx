
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import loginImg from '../../assets/trees.jpg'
const SIGNUP_URL = 'http://localhost:8080/login/signup';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
export default function Signup() {
    const displayNameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
   

    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    useEffect(() => {
        displayNameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [displayName, username, password]);
    const navigate = useNavigate(); 
    const handleLoginClick = () => {
      navigate('/login'); 
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(SIGNUP_URL, {
                display_name: displayName,
                username: username,
                password: password
            });

            console.log(response.data);

            if (response.data.data===0) {
                navigate('/login'); 
            }
        } catch (err) {
            if (!err.response) {
                console.log(err);
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Invalid input data');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Signup Failed');
            }
        }
    };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={loginImg} alt="" />
        </div>

        <div className='bg-gray-100 flex flex-col justify-center'>
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form className='max-w-[400px] w-full mx-auto bg-white p-4'>
                <h2 className='text-4xl font-bold text-center py-6'>Tây Nguyên Legend</h2>
                <div className='flex flex-col py-2'>
                    <label className='font-bold'>Full Name</label>
                    <input className='border p-2' type="text" ref={displayNameRef} required value={displayName} onChange={(e) => setDisplayName(e.target.value)} autoComplete='off' />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='font-bold'>Username</label>
                    <input className='border p-2' type="text" ref={usernameRef} required value={username} onChange={(e) => setUsername(e.target.value)} autoComplete='off' />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='font-bold'>Password</label>
                    <input className='border p-2' type="password" ref={passwordRef} required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='font-bold border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white' onClick={handleSubmit}>Sign up</button>
                <div className='flex justify-between'>
                    <p className='flex items-center font-bold'>Already had account?</p>
                    <button className='font-bold' onClick={handleLoginClick}>Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}