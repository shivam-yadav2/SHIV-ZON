
import Layout from '../../components/layout/Layout'
import React, { useContext, useEffect, useState } from 'react'
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { CiHeart } from "react-icons/ci";
import axios from 'axios';
import { addToCart } from '../../Cart/CartSlice';
import { addToWish } from '../../Cart/WishSlice';
import MyContext from '../../context/MyContext';
import { NavLink } from 'react-router-dom';

function AllProducts() {
    const productDispatch = useDispatch()
    const context = useContext(MyContext)
    const { getProduct, setProductInfo } = context

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Layout>
            <div className=' flex flex-wrap justify-center  product-section w-full h-full p-8 mt-12 '>
                <h1 className='text-4xl font-extrabold m-6 mb-10'>All Products</h1>
                <div className="product-items justify-between flex flex-wrap gap-11">
                    {
                        getProduct.map((data, index) => (
                            <div key={index} className=" flex flex-col justify-between product-card p-4 rounded-3xl">
                                <div className='w-full h-[250px] overflow-hidden rounded-3xl'>
                                    <NavLink to='/info' className='w-full '>
                                        <img src={data.imageUrl} alt="" className='rounded-3xl duration-150  mb-3 hover:scale-110' onClick={() => setProductInfo(data.id)} />
                                    </NavLink>
                                </div>
                                <div className="product-details p-3 flex justify-between">
                                    <NavLink to='/info'>
                                        <h2 onClick={() => setProductInfo(data.id)} className='text-xl font-bold '>{data.title}</h2>
                                    </NavLink>
                                    <h3 className='text-xl font-semibold'>Prize : {data.price}</h3>
                                </div>
                                <p className='px-3'>{data.description}</p>
                                <div className='flex justify-between items-center px-5'>
                                    <button onClick={() => { productDispatch(addToCart({ id: data.id, imageUrl: data.imageUrl, title: data.title, price: data.price })) }} className='flex  items-center justify-end text-xl  p-1 px-3 rounded-3xl hover:scale-105 cursor-pointer active:scale-110'><FaCartPlus />Add To cart</button>
                                    <CiHeart className='text-4xl cursor-pointer active:scale-110' onClick={() => productDispatch(addToWish({ id: data.id, imageUrl: data.imageUrl, title: data.title, price: data.price }))} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default AllProducts