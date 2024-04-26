import React, { useContext, useEffect, useState } from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import MyContext from '../../context/MyContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Cart/CartSlice';
import { addToWish } from '../../Cart/WishSlice';
import Layout from '../../components/layout/Layout';
import { auth } from '../../Firebase/Firebase';

const ProductInfo = () => {

    const [user, setUser] = useState(null)

    useEffect(() => {

        const data = auth.currentUser
        setUser(data)
    }, [])

    const context = useContext(MyContext)
    const { productInfo, getProduct } = context

    const dispatch = useDispatch()

    useEffect(() => {
    window.scrollTo(0,0)
},[])


    return (
        <Layout>
            <div className=" mt-12 bg-transparent container-box-shadow p-4  rounded-lg w-full h-[100vh] flex flex-col justify-center items-center">
                <h1 className='text-4xl font-extrabold mb-10'>Product Detail</h1>
                {
                    getProduct.map((product, index) => (

                        product.id === productInfo ?

                            <div className="bg-transparent md:m-0 md:mx-0  py-5  w-full  md:w-[650px] h-[400px] md:p-4 md:pe-12 rounded-lg flex md:flex-row flex-col md:justify-between justify-between items-center  md:items-center" style={{
                                boxShadow: "5px 5px 25px rgba(255, 255, 255, 0.692)"
                            }}>
                                <div className="flex items-center w-[200px] md:w-[350px] h-[250px] overflow-hidden rounded-2xl" style={{
                                    boxShadow: "5px 5px 10px rgba(255, 255, 255, 0.692)"
                                }}>
                                    <img src={product.imageUrl} alt={product.name} className="w-[200px]  md:w-[350px] h-[250px] rounded-2xl  mr-4 hover:scale-110  duration-200" />
                                </div>

                                <div className="flex items-center md:mt-0 mt-4 md:items-start justify-between flex-col ms-7 ">
                                    <div className='mb-4'>
                                        <h2 className="text-lg text-white font-bold">{product.title}</h2>
                                        <p className="text-gray-500">{product.category}</p>
                                    </div>
                                    <p className="text-lg font-bold mr-4">₹ {product.price}</p>
                                    <p className="mt-4 text-sm text-gray-600 ">{product.description}</p>
                                    {
                                        user && <div className='flex items-center justify-center'>
                                            <button onClick={() => dispatch(addToCart({ id: product.id, imageUrl: product.imageUrl, title: product.title, price: product.price }))} className="bg-blue-500 hover:bg-blue-600 mt-4 text-white py-2 px-4 rounded-lg ">
                                                Add to Cart
                                            </button>
                                            <IoHeartOutline onClick={() => dispatch(addToWish({ id: product.id, imageUrl: product.imageUrl, title: product.title, price: product.price }))} className='text-3xl mt-4 ms-3 cursor-pointer' />
                                        </div>
                                    }
                                </div>
                            </div>
                            : ''
                    ))
                }
            </div>
        </Layout>
    );
};

export default ProductInfo;
