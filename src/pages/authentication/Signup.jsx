import React, { useState, useEffect } from 'react'
import { fireDB, auth } from '../../Firebase/Firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';

function Signup() {
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPass, setSignUpPass] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [userName, setUserName] = useState('')

    const navigate = useNavigate()

    async function handelSignUp(e) {
        e.preventDefault()

        if (signUpEmail === "" || signUpPass === "") {
            toast.error("All Fields are Required")
        }
        else {
            try {
                const data = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPass).then((resp) => {
                    const user = resp.user
                    console.log(user)
                    if (user.uid) {
                        toast.success("Account Created Successfully")
                        
                        navigate('/login')
                    }
                })
                const user = {
                    name: userName,
                    uid: data.user.uid,
                    email: data.user.email,
                    time: Timestamp.now()
                }
                const userRef = collection(fireDB, "users")
                await addDoc(userRef, user);
                toast.success("Signup Succesfully")
                setName("");
                setEmail("");
                setPassword("");
            } catch (error) {
                console.log(error)
            }
        }


    }

    return (
        <>
            {/* <Navbar /> */}
            <div className='login-container w-full flex h-full items-center justify-center'>
                <div className="login-box md:mx-0 mx-5 h-full md:h-[600px] mb-12">
                    <h1>Let's get<br />__________ started!</h1>
                    <div className='login-form flex flex-col justify-center items-center'>
                        <form onSubmit={handelSignUp} className='flex flex-col gap-12'>
                            <div className='flex justify-between items-center'>
                                <label htmlFor="user-name" className='md:text-[20px] text-[18px]'>Name :</label>
                                <input
                                    id='user-name'
                                    value={userName}
                                    placeholder='Enter your Name'
                                    className='md:text-[17px] text-[15px]'
                                    onChange={(e) => setUserName(e.target.value)}
                                    type="text"
                                    required />
                            </div>
                            <div className='flex justify-between items-center'>
                                <label htmlFor="login-email" className='md:text-[20px] text-[15px]'>Em@il :</label>
                                <input
                                    id='login-email'
                                    value={signUpEmail}
                                    onChange={(e) => setSignUpEmail(e.target.value)}
                                    placeholder='Enter your email Id'
                                    type="text"
                                    required
                                    className='login-input-email md:text-[17px] text-[15px]' />
                            </div>
                            <div className='relative'>
                                <div className='flex justify-between items-center' >
                                    <label htmlFor="login-pass" className='md:text-[20px] text-[15px]'>P@ssword : </label>
                                    <input
                                        id='login-pass'
                                        value={signUpPass}
                                        onChange={(e) => setSignUpPass(e.target.value)}
                                        placeholder='Enter your Password'
                                        type="password"
                                        required
                                        className='login-input-pass md:text-[17px] text-[15px]' />
                                </div>
                                {
                                    passError &&
                                    <span className='validation-pass'>Password must contains 8 characters!</span>
                                }
                            </div>
                            <button type='submit'>
                                Create Account
                            </button>
                        </form>
                        <h2>OR</h2>
                        <NavLink to='/login' className='w-full'>
                            <button>Already have an Account</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup