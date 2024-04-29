
import { useNavigate } from 'react-router-dom'; 
import { useState,useEffect,useRef } from "react";
import loginImg from '../../assets/trees.jpg'
import axios from 'axios';
const LOGIN_URL = 'http://localhost:8080/login/signin';

export default function Login() {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);
    const handleSignupClick = () => {
        navigate('/signup'); 
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, { username:username, password:password }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);

            setUsername('');
            setPassword('');

            if (response.data && response.data.data === true) {
                window.localStorage.setItem('username', response.data.username);
                if(response.data.type==="user")
                {
                    navigate('/listproducts');
                }else{
                    navigate('/Dashboard');
                }
                
            }
        } catch (err) {
            if (!err.response) {
                console.log(err);
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={loginImg} alt="" />
        </div>
 
        <div className='bg-gray-100 flex flex-col justify-center'>
            <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-white p-4'>
                <h2 className='text-4xl font-bold text-center py-6'>Tây Nguyên Legend</h2>
                <div className='flex flex-col py-2'>
                    <label className='font-bold'>Username</label>
                    <input  className='border p-2' type="text" id="username" ref={userRef} required value={username} onChange={(e)=>setUsername(e.target.value)} autoComplete='off' />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='font-bold'>Password</label>
                    <input className='border p-2' type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}  />
                </div>
                <button className='font-bold border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'>Sign In</button>
                <div className='flex justify-between'>
                    <p className='flex items-center font-bold'><input className='mr-2' type="checkbox" /> Remember Me</p>
                    <button className='font-bold'  onClick={handleSignupClick} >Create an account</button>
                </div>
            </form>
        </div>
    </div>
  )
}