import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { auth, fireDB } from '../../Firebase/Firebase';
import { addDoc, collection } from 'firebase/firestore';
import MyContext from '../../context/MyContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BuyNow = () => {

    const navigate = useNavigate()

    const cartItems = useSelector(state => state.CartSlice.cart)

    const context = useContext(MyContext)
    const { totalAmount } = context

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        pincode: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    useEffect(() => {
        // Update date in formData when component mounts
        setFormData((prevData) => ({
            ...prevData

        }));
    }, []);

    const handelPurchase = async () => {

        console.log('Form data:', formData);
        // Reset form data after submission
        setFormData({
            name: '',
            address: '',
            pincode: '',
            phoneNumber: ''
        });

        const { name, address, pincode, phoneNumber } = formData

        if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
            return toast.error("All fields are required", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

        const addressInfo = {
            name,
            address,
            pincode,
            phoneNumber,
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
        console.log(addressInfo)

        var options = {
            key: "rzp_test_fWMflLeZ9A8pLD",
            key_secret: "nWvqCnxa8CdqeOOskwNN2v3o",
            amount: (totalAmount)*100,
            currency: "INR",
            order_receipt: 'order_rcptid_' + name,
            name: "SHIV-ZON",
            description: "for testing purpose",
            handler: async function (response) {
                console.log(response)
                toast.success('Payment Successful')

                const paymentId = response.razorpay_payment_id

                const orderInfo = {
                    cartItems,
                    addressInfo,
                    date: new Date().toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    ),
                    email: auth?.currentUser.email,
                    userId: auth?.currentUser.uid,
                    paymentId
                }
                console.log(orderInfo , "orderInfo")

                try {
                    const result = await addDoc(collection(fireDB, "orders"), orderInfo)
                    console.log(result , "result")
                } catch (error) {
                    console.log(error)
                }
            },

            theme: {
                color: "#3399cc"
            }
        };

        var pay = new window.Razorpay(options);
        pay.open();
        console.log(pay)
        navigate('/cart')
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-transparent">
            <div className=" bg-transparent bg-opacity-10 p-8 rounded-lg shadow-lg w-full max-w-md" style={{
                boxShadow: " 5px 2px 15px rgba(23, 212, 212, 0.692)"
            }}>
                <h2 className="text-2xl font-bold mb-4">Buy Now</h2>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 w-full border bg-transparent border-gray-300 rounded-lg" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-400">Address</label>
                    <textarea id="address" name="address" value={formData.address} onChange={handleChange} className="mt-1 p-2 w-full border bg-transparent border-gray-300 rounded-lg resize-none" rows={4} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-400">Pincode</label>
                    <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} className="mt-1 p-2 w-full border bg-transparent border-gray-300 rounded-lg" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-400">Phone Number</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="mt-1 p-2 w-full border bg-transparent border-gray-300 rounded-lg" required />
                </div>
                <div className="flex justify-between mt-5">
                    <NavLink to='/cart'>
                        <button type="button" className="bg-gray-300 cursor-pointer hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg">Cancel</button>
                    </NavLink>
                    <button onClick={handelPurchase} className="w-[120px] bg-transparent cursor-pointer hover:scale-105 active:scale-110 text-white py-2 px-4 rounded-lg" style={{
                        boxShadow: " 5px 2px 15px rgba(255, 255, 255, 0.9)"
                    }}>Buy Now</button>

                </div>

            </div>
        </div>
    );
};

export default BuyNow;
