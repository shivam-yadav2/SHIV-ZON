import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/MyContext'

function UpdateProduct() {

    const context = useContext(MyContext)
    const { setProduct, product, updateProduct } = context
    return (
        <Layout>
            <div className='login-container w-full my-12 h-fit flex  items-center justify-center'>
                <div className="login-box ">
                    <h1>Update Product ↴</h1>
                    <div className='login-form flex flex-col justify-center items-center'>
                        <div className='flex flex-col gap-12' >
                            <div className="relative">
                                <div className='flex justify-between items-center'>
                                    <label htmlFor="title">Title :</label>
                                    <input
                                        id='title'
                                        name='title'
                                        value={product.title}
                                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                                        placeholder='Enter Product title'
                                        type="text"
                                        className='login-input-email' />
                                </div>

                            </div>
                            <div className="relative">
                                <div className='flex justify-between items-center'>
                                    <label htmlFor="price">Price :</label>
                                    <input
                                        id='price'
                                        name='price'
                                        value={product.price}
                                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                        placeholder='Enter Product price'
                                        type="text"
                                        className='login-input-email' />
                                </div>

                            </div>
                            <div className="relative">
                                <div className='flex justify-between items-center'>
                                    <label htmlFor="category">Category :</label>
                                    <input
                                        id='category'
                                        name='category'
                                        value={product.category}
                                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                                        placeholder=' Product category'
                                        type="text"
                                        className='login-input-email' />
                                </div>
                            </div>

                            <div className='relative'>
                                <div className='flex justify-between items-center ' >
                                    <label htmlFor="imageUrl">Image Url: </label>
                                    <input
                                        id='imageUrl'
                                        name='imageUrl'
                                        value={product.imageUrl}
                                        onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
                                        placeholder='Enter Image Url'
                                        type="text"
                                        className='login-input-pass' />
                                </div>
                            </div>
                            <div className='relative'>
                                <div className='flex justify-between items-center ' >
                                    <label htmlFor="description">Description</label>
                                    <input
                                        id='description'
                                        value={product.description}
                                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                        name='description'
                                        placeholder='Product Description'
                                        type="text"
                                        className='login-input-pass' />
                                </div>
                            </div>
                            <button onClick={updateProduct}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct