import React, { useState, useEffect } from 'react'
import { fireDB, auth } from '../../Firebase/Firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
                await createUserWithEmailAndPassword(auth, signUpEmail, signUpPass).then((resp) => {
                    const user = resp.user
                    console.log(user)
                    if (user.uid) {
                        toast.success("Account Created Successfully")
                        navigate('/login')
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }


    }

    return (
        <>
            {/* <Navbar /> */}
            <div className='login-container w-full flex h-full items-center justify-center'>
                <div className="login-box h-[600px] mb-12">
                    <h1>Let's get<br />__________ started!</h1>
                    <div className='login-form flex flex-col justify-center items-center'>
                        <form onSubmit={handelSignUp} className='flex flex-col gap-12'>
                            <div className='flex justify-between items-center'>
                                <label htmlFor="user-name">Name</label>
                                <input
                                    id='user-name'
                                    value={userName}
                                    placeholder='Enter your Name'
                                    className=''
                                    onChange={(e) => setUserName(e.target.value)}
                                    type="text"
                                    required />
                            </div>
                            <div className='flex justify-between items-center'>
                                <label htmlFor="login-email">Em@il :</label>
                                <input
                                    id='login-email'
                                    value={signUpEmail}
                                    onChange={(e) => setSignUpEmail(e.target.value)}
                                    placeholder='Enter your email Id'
                                    type="text"
                                    required
                                    className='login-input-email' />
                            </div>
                            <div className='relative'>
                                <div className='flex justify-between items-center' >
                                    <label htmlFor="login-pass">P@ssword : </label>
                                    <input
                                        id='login-pass'
                                        value={signUpPass}
                                        onChange={(e) => setSignUpPass(e.target.value)}
                                        placeholder='Enter your Password'
                                        type="password"
                                        required
                                        className='login-input-pass' />
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
                        <button>Already have an Account</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup