import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Products from '../../components/Products';
import { auth } from '../../Firebase/Firebase';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";


gsap.registerPlugin(useGSAP);



function Home() {

    // **************** ANIMATION ********************
    const hero = useRef()

    useGSAP(() => {
        gsap.from('.hero-txt', {
            x: 700,
            duration: 1,
            stagger: .5,
            yoyo:true
        })
    }, { scope: hero })
    
    useGSAP(() => {
        gsap.from('.hero-img', {
            opacity: 0,
            scale:0.5,
            duration: 1,
            stagger: .5,
            yoyo:true
        })
            
    } , {scope:hero})

    return (
        <>
            <Navbar />
            <div ref={hero} className='w-full flex flex-col md:flex-row justify-center items-center  mt-12'>
                <img src="/images/hero.png" alt="" className='hero-img md:w-[47%] w-[80%]' />
                <div className='hero-text'>
                    <h1 className='md:mt-[90px] mt-[30px] md:mx-10 mx-5 hero-txt md:text-[100px] md:block hidden'>RGB<br />GAMING<br />ACCESSORIES</h1>
                    <h3 className='text-xl mx-10 hero-txt'>FOR TRUE GAMERS</h3>
                </div>
            </div>
            <Products />
            <Footer />
        </>
    )
}

export default Home