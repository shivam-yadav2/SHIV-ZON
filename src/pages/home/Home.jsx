import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Products from '../../components/Products';
import { auth } from '../../Firebase/Firebase';


function Home() {

    return (
        <>
            <Navbar />
            <div className='w-full flex mt-12'>
                <img src="/images/hero.png" alt="" className='hero-img' />
                <div className='hero-text'>
                    <h1 className='mt-[90px] mx-10'>RGB<br />GAMING<br />ACCESSORIES</h1>
                    <h3 className='text-xl mx-10'>FOR TRUE GAMERS</h3>
                </div>
            </div>
            <Products/>
            <Footer />
        </>
    )
}

export default Home