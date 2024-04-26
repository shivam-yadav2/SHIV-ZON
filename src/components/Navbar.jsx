import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BiSolidCartAlt } from "react-icons/bi";
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { gsap } from "gsap";
import { IoReorderThree } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.CartSlice.cart);
    const dummy = {
        displayName: 'No - Name',
        email: 'johndoe@example.com',
        photoURL: 'https://via.placeholder.com/150', // Placeholder image URL
    };

    useEffect(() => {
        const data = auth.currentUser;
        setUser(data);
    }, []);

    async function handelLogout() {
        try {
            await signOut(auth).then((resp) => {
                toast.success("Logout Successful");
                navigate('/login');
            });
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // **************** ANIMATION ********************
    const box = useRef();
    useGSAP(() => {
        gsap.from(".animate", {
            y: -100,
            opacity: 0,
            duration: .5,
            delay: .3,
            stagger: 0.1
        });
    }, { scope: box });

    const [showMenu, setShowMenu] = useState(false);
    const [navIcon, setNavIcon] = useState(false)

    const toggleMenu = () => {
        setShowMenu(prevState => !prevState);
        setNavIcon(prevState => !prevState);
    };

    return (
        <>
            <div ref={box} className='z-10 bg-gradient-to-r from-black to-cyan-950 shadow-lg w-full flex p-4 justify-between navbar fixed top-0'>
                <NavLink className='text-4xl font-extrabold animate' to='/'>LOGO</NavLink>
                <button className='block md:hidden text-3xl absolute right-0' onClick={toggleMenu}>
                    {navIcon ? <RxCross2 />: <IoReorderThree/>}
                </button>
                <div className='flex md:flex-row flex-col justify-center md:m-0 md:p-0 pt-8 pe-12 '> 
                    <ul className={`navBar flex gap-4 items-center ${showMenu ? ' flex-col mt-4 ' : 'hidden'} md:flex`}>
                        <li className='hover:underline active:scale-125'>
                            <NavLink to={'/allproducts'} className='md:px-5 pe-12 animate'>All Products</NavLink>
                        </li>
                        <li className='hover:underline active:scale-125'>
                            <NavLink to={'/asses'} className='md:px-5 pe-12 animate'>Accessories</NavLink>
                        </li>
                        {user?.email === 'shiv@admin.com' && (
                            <li className='hover:underline active:scale-125'>
                                <NavLink to={'/dashboard'} className='md:px-5 pe-12 animate'>Admin</NavLink>
                            </li>
                        )}
                        <li className='hover:underline active:scale-125'>
                            <NavLink to={'/wishlist'} className='md:px-5 pe-12 animate'>Wishlist</NavLink>
                        </li>
                        {/* <li className='hover:underline active:scale-125'>
                            <NavLink to={'/about'} className='md:px-5 pe-12 animate'>About</NavLink>
                        </li> */}
                    </ul>
                    <div className={`nav-btn flex md:flex-row flex-col items-start   md:items-center ms-10 justify-between w-[300px] ${showMenu ? 'block' : 'hidden'} md:flex`}>
                        {user ? (
                            <div className='flex items-center md:ps-0 ps-8 flex-col md:flex-row'>
                                {user?.picture ? (
                                    <NavLink to='/profile' className="flex md:flex md:flex-row flex-col animate items-center">
                                        <img src={user.picture} alt="avatar" className='animate  md:pe-0  pe-12' style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            border: "1px solid cyan"
                                        }} />
                                        <h2 className='mx-4  md:pe-0  pe-12 animate'>{user.name}</h2>
                                    </NavLink>
                                ) : (
                                    <NavLink to='/profile' className="flex items-center animate">
                                        <img src={dummy.photoURL} className='animate' alt="avatar" style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            border: "1px solid cyan"
                                        }} />
                                        <h2 className='mx-4 animate'>{dummy.displayName}</h2>
                                    </NavLink>
                                )}
                                <NavLink>
                                    <button onClick={handelLogout} className='animate'>Logout</button>
                                </NavLink>
                            </div>
                        ) : (
                            <div>
                                <NavLink to={'/signUp'}>
                                    <button className='animate'>Sign Up</button>
                                </NavLink>
                                <NavLink to={'/login'} className='ms-4 animate'>
                                    <button>Sign In</button>
                                </NavLink>
                            </div>
                        )}
                        {user && (
                            <div className=' md:w-fit w-full flex justify-center'>
                                <NavLink to={"/cart"} className='hover:underline md:pe-0 pe-[80px] animate active:scale-125 flex'>
                                    <BiSolidCartAlt className='text-4xl' />
                                    <span>{cartItems.length}</span>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
