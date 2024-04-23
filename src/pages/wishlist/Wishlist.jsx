import React from 'react'
import Navbar from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { removeToWish } from '../../Cart/WishSlice'


function Wishlist() {
    const productSelector = useSelector(state => state.WishSlice.wishList)
    // console.log(productSelector);
    const dispatch = useDispatch()
    return (
        <>
        <Navbar/>
            <div className='mt-24'>
                <h1 className=' text-5xl font-extrabold m-6 mb-10'>Wish-List</h1>
                <div className='w-full flex-col gap-11  p-10 h-full flex justify-center '>
                    {
                        productSelector.map((data, index) => (
                            <div key={index} className=" flex items-center justify-between product-cart p-4 rounded-3xl w-[800px]">
                                <img src={data.imageUrl} alt="" style={{
                                    width: "150px",
                                    height: "100px"
                                }} className='rounded-3xl w-[150px]  mb-3' />
                                <div className="product-details-cart p-2 flex w-full items-center justify-between">
                                    <h2 className='text-xl font-bold ms-3 w-[140px]'>{data.title}</h2>
                                    <h3 className='text-xl font-semibold w-fit ms-6'>Prize : {data.price}</h3>
                                    <button onClick={() => dispatch(removeToWish({ id: data.id }))} className=' text-xl   p-1 px-3 rounded-3xl active:scale-110'>Remove From WishList</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
        </div>
        </>
    )
}

export default Wishlist