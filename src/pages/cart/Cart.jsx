import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeToCart } from '../../Cart/CartSlice'
import MyContext from '../../context/MyContext'
import { NavLink } from 'react-router-dom'


function Cart() {
    const cartItems = useSelector(state => state.CartSlice.cart)
    console.log(cartItems);
    const dispatch = useDispatch()

    const context = useContext(MyContext)
    const {setTotalAmount} = context

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const [totalAmnt, setTotalAmnt] = useState(0)

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((cartItem) => {
            temp = temp + parseInt(cartItem.price)
        });
        setTotalAmnt(temp)
    }, [cartItems])

    const shipping = parseInt(100)

    const grandTotal = shipping + totalAmnt;
    setTotalAmount(grandTotal)

    return (
        <>
            <Navbar />
            <h1 className='text-5xl font-extrabold m-6 mb-10'>Cart</h1>
            <div className='w-full grid grid-cols-12 '>
                <div className='md:col-span-8 col-span-12'>
                    <div className='w-full flex-col gap-11  p-10 h-full flex justify-center '>
                        {
                            cartItems.map((data, index) => (
                                <div key={index} className=" flex md:flex-row flex-col items-center justify-between product-cart p-4 rounded-3xl w-full h-full md:w-[800px]">
                                    <img src={data.imageUrl} alt="" style={{
                                        width: "150px",
                                        height: "100px"
                                    }} className='rounded-3xl w-[150px]  mb-3' />
                                    <div className="product-details-cart p-2 flex md:flex-row flex-col w-full items-center justify-between">
                                        <h2 className='text-xl font-bold ms-3 md:w-[140px]'>{data.title}</h2>
                                        <h3 className='text-xl font-semibold mdw-fit ms-6'>Prize : {data.price}</h3>
                                        <button onClick={() => dispatch(removeToCart({ id: data.id }))} className=' text-xl   p-1 px-3 rounded-3xl active:scale-110'>Remove From WishList</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="md:col-span-4 col-span-12 w-full h-full flex justify-center items-center  ">
                    <div className='w-[355px] h-[320px] rounded-xl gap-5 cart-amount flex-col flex p-8 m-12  md:fixed md:top-[180px] '>
                        <div className='w-full flex gap-5 flex-col border-b pb-3'>
                            <div className='flex justify-around text-lg md:text-2xl mb-2'>
                                <p className='font-bold text-cyan-400'>Subtotal →</p>
                                <p>₹ {totalAmnt }</p>
                            </div>
                            <div className='flex justify-around text-lg md:text-2xl mb-2'>
                                <p className='font-bold text-cyan-400'>Shipping →</p>
                                <p>₹ {shipping}</p>
                            </div>
                        </div>
                        <div className='flex justify-around ext-lg md:text-2xl mb-2 border-b pb-4'>
                            <p className='font-bold text-cyan-400'>Total →</p>
                            <p>₹ {grandTotal}</p>
                        </div>
                        <div className= 'text-xl md:text-3xl flex justify-center  '>
                            <NavLink to='/buy'>
                                <button className='text-yellow-400 cart-amnt-btn cursor-pointer'>Order Now</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Cart