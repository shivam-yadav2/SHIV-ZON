import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosMail } from "react-icons/io";
import { FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <>
            <div className='w-full h-[300px] bg-black p-6'>
                <div>
                    <NavLink className='text-4xl font-extrabold mb-6' to='/'>LOGO</NavLink>
                    <h4 className='mb-4'>For Order Related Enquiries :</h4>
                    <p className='flex items-center mb-6'><IoIosMail /> shivZon@shooping.com</p>
                    <h2 className='text-xl'>Follow Us</h2>
                    <div className='flex gap-4 mt-3'>
                        <FaGithub className='text-xl'/>
                        <FaInstagram className='text-xl' />
                        <FaFacebook className='text-xl' />
                        </div>
                </div>
            </div>
        </>
    )
}

export default Footer