import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { BiSolidCartAlt } from "react-icons/bi";
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { FaRegUserCircle } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(useGSAP);


function Navbar() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const cartItems = useSelector(state => state.CartSlice.cart)

    const dummy = {
        displayName: 'No - Name',
        email: 'johndoe@example.com',
        photoURL: 'https://via.placeholder.com/150', // Placeholder image URL
    };

    useEffect(() => {
        const token = Cookies.get('accessToken')
        const decode = token && jwtDecode(token)
        console.log(decode)

        const data = auth.currentUser
        setUser(decode)
    }, [])

    async function handelLogout() {
        Cookies.remove('accessToken')
        try {
            await signOut(auth).then((resp) => {
                console.log(resp)
                toast.success("Logout SuccessFull")
                navigate('/login')
            })
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // **************** ANIMATION ********************
    const box = useRef()

    useGSAP(() => {
        gsap.from(".animate", {
            y: -100,
            opacity: 0,
            duration: .5,
            delay: .3,
            stagger: 0.1
        })
    }, { scope: box })


    return (
        <>
            <div ref={box} className=' z-10 bg-gradient-to-r from-black to-cyan-950 shadow-lg w-full flex p-4  justify-between  navbar fixed  top-0  '>
                <NavLink className='text-4xl font-extrabold animate' to='/' >LOGO</NavLink>
                <ul className='navBar flex gap-4 items-center '>
                    <li className='hover:underline active:scale-125'>
                        <NavLink to={'/allproducts'} className='px-5 animate '>All Products</NavLink>
                    </li>
                    <li className='hover:underline active:scale-125'>
                        <NavLink to={'/asses'} className='px-5 animate '>Accessories</NavLink>
                    </li>
                    {
                        user?.email === 'shiv@admin.com' && <li className='hover:underline active:scale-125'>
                            <NavLink to={'/dashboard'} className='px-5 animate'>Admin</NavLink>
                        </li>
                    }
                    <li className='hover:underline active:scale-125'>
                        <NavLink to={'/wishlist'} className='px-5 animate'>Wishlist</NavLink>
                    </li>
                    <li className='hover:underline active:scale-125'>
                        <NavLink to={'/about'} className='px-5 animate'>About</NavLink>
                    </li>
                </ul>
                <div className='nav-btn flex items-center justify-between w-[300px]'>
                    {
                        user ?
                            <div className='flex items-center'>
                                {
                                    user?.picture ? <NavLink to='/profile' className="flex animate items-center">
                                        <img src={user.picture} alt="avtar" className='animate' style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            border: "1px solid cyan"
                                        }} />
                                        <h2 className='mx-4 animate'>{user.name}</h2>
                                    </NavLink> : <NavLink to='/profile' className="flex items-center animate">
                                            <img src={dummy.photoURL} className='animate' alt="avtar" style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%", 
                                            border: "1px solid cyan"
                                        }} />
                                            <h2 className='mx-4 animate'>{dummy.displayName}</h2>
                                    </NavLink>
                                }
                                <NavLink>
                                    <button onClick={handelLogout} className='animate'>Logout</button>
                                </NavLink>
                            </div> : <div>
                                <NavLink to={'/signUp'}>
                                    <button className='animate'>Sign Up</button>
                                </NavLink>
                                <NavLink to={'/login'} className='ms-4 animate'>
                                    <button >Sign In</button>
                                </NavLink>
                            </div>
                    }
                    {
                        user && <NavLink to={"/cart"} className='hover:underline animate active:scale-125 flex'><BiSolidCartAlt className='text-4xl' /><span>{cartItems.length}</span></NavLink>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar