import React from 'react'
// import Navbar from './Navbar.jsx'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Firebase/Firebase';
import Cookies from 'js-cookie'
import { NavLink, useNavigate } from 'react-router-dom';



function Login() {
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPass, setLoginPass] = useState('')
    const [emailErr, setEmailErr] = useState(false)
    const [passErr, setPassErr] = useState(false)
    const navigate = useNavigate()

    async function handelLogin(e) {
        e.preventDefault()
        if (loginEmail === "" || loginPass === "") {
            toast.error("All fiels are Required")
            setPassErr(true)
            setEmailErr(true)
        }
        else {
            try {
                await signInWithEmailAndPassword(auth, loginEmail, loginPass).then((resp) => {
                    const user = resp.user
                    console.log(user)
                    toast.success("Login Successful")
                    Cookies.set('accessToken', user.accessToken, { expires: 1 })
                    navigate('/')
                })
            } catch (error) {
                console.log(error)
            }
            const user = auth?.currentUser
            Cookies.set('user' ,user)
        }
    }
    return (
        <>
            <div className='login-container w-full flex h-full items-center justify-center'>
                <div className="login-box  ">
                    <h1>Hey,<br />Welcome Back!</h1>
                    <div className='login-form flex flex-col justify-center items-center'>
                        <form className='flex flex-col gap-12' onSubmit={handelLogin}>
                            <div className="relative">
                                <div className='flex justify-between items-center'>
                                    <label htmlFor="login-email">Em@il :</label>
                                    <input
                                        id='login-email'
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        placeholder='Enter your email Id'
                                        type="text"
                                        className='login-input-email' />
                                </div>
                                {
                                    emailErr &&
                                    <span className='validation-pass'>Password must contains 8 characters!</span>
                                }
                            </div>
                            
                            <div className='relative'>
                                <div className='flex justify-between items-center ' >
                                    <label htmlFor="login-pass">P@ssword : </label>
                                    <input
                                        id='login-pass'
                                        value={loginPass}
                                        onChange={(e) => setLoginPass(e.target.value)}
                                        placeholder='Enter your Password'
                                        type="password"
                                        className='login-input-pass' />
                                </div>
                                {
                                    passErr &&
                                    <span className='validation-pass'>Password must contains 8 characters!</span>
                                }
                            </div>
                            <button type='submit'>
                                LogIn
                            </button>
                        </form>
                        <h2>OR</h2>
                        <NavLink to='/signUp' className='w-full'>
                            <button>Create an Account</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login