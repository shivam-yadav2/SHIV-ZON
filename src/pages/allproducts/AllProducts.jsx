
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
import { auth } from '../../Firebase/Firebase';

function AllProducts() {

    const [user, setUser] = useState(null)

    useEffect(() => {

        const data = auth.currentUser
        setUser(data)
    }, [])
    const productDispatch = useDispatch()
    const context = useContext(MyContext)
    const { getProduct, setProductInfo } = context

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Layout>
            <div className='mt-12 flex flex-wrap justify-center  product-section w-full h-full p-8 '>
                <h1 className='text-4xl font-extrabold m-6 mb-10'>Most Liked! Products</h1>
                <div className=" justify-between flex sm:flex-row flex-col flex-wrap gap-11">
                    {
                        getProduct.map((data, index) => (
                            <div key={index} className=" flex flex-col sm:w-[30%] sm:h-[500px] justify-between  p-4 rounded-3xl" style={{
                                boxShadow: "5px 2px 15px rgba(23, 212, 212, 0.692)"
                            }}>
                                <div className='w-full h-[250px] overflow-hidden rounded-3xl'>
                                    <NavLink to='/info' className='w-full '>
                                        <img src={data.imageUrl} alt="" className='rounded-3xl duration-150 sm:w-[100%] h-full w-full sm:h-[250px] object-center  md:mb-3 hover:scale-110' onClick={() => setProductInfo(data.id)} />
                                    </NavLink>
                                </div>
                                <div className="product-details p-3 flex justify-between">
                                    <NavLink to='/info'>
                                        <h2 onClick={() => setProductInfo(data.id)} className='text-lg md:text-xl font-bold '>{data.title}</h2>
                                    </NavLink>
                                    <h3 className='md:text-xl text-md font-semibold'>Prize : {data.price}</h3>
                                </div>
                                <p className='px-3 md:text-lg text-[14px] mb-1' style={{
                                    color: "rgb(180, 180, 180)"
                                }}>{data.description}</p>
                                {
                                    user &&
                                    <div className='flex justify-between sm:mt-[10px] items-center px-3 md:px-5'>
                                        <button onClick={() => { productDispatch(addToCart({ id: data.id, imageUrl: data.imageUrl, title: data.title, price: data.price })) }} className='flex  items-center justify-end text-lg md:text-xl  p-1 px-2 md:px-3 rounded-3xl hover:scale-105 cursor-pointer active:scale-110' style={{
                                            backgroundColor: "rgb(23, 212, 212)"
                                        }}><FaCartPlus />Add To cart</button>

                                        <CiHeart className='text-4xl cursor-pointer active:scale-110' onClick={() => productDispatch(addToWish({ id: data.id, imageUrl: data.imageUrl, title: data.title, price: data.price }))} />
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default AllProducts