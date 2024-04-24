import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { ShivZonApp, auth } from '../../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import { getAuth } from 'firebase/auth';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';


function Profile() {

    const context = useContext(MyContext)
    const {getProfileData} = context

    // const context = useContext(MyContext)
    // const { getProfile } = context
    // console.log(getProfile)
    const [getProfile, setGetProfile] = useState(null)

    useEffect(() => {
        const data1 = getAuth(ShivZonApp)
        const data = data1.currentUser
        console.log(data)

        const token = Cookies.get('accessToken')
        const decode = token && jwtDecode(token)
        console.log(decode)
        setGetProfile(decode)
        getProfileData()
    }, [ ])

    const navigate = useNavigate()

    const user = {
        displayName: 'No - Name',
        email: 'johndoe@example.com',
        photoURL: 'https://via.placeholder.com/150', // Placeholder image URL
    };
    const handleEdit = () => {
        // Handle edit profile logic here
        console.log('Edit profile clicked');
        navigate('/editprofile')
    };
    return (
        <Layout>
            <div className="min-h-screen flex flex-col justify-center items-center bg-transparent">
                <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <div className="flex items-center mb-4">
                        {
                            getProfile?.picture === null ?
                                <img src={user?.photoURL} alt="User" className="w-24 h-24 rounded-full mr-4" />
                            :
                                <img src={getProfile?.picture} alt="User" className="w-24 h-24 rounded-full mr-4" />   
                        }
                        <div className='ms-4'>
                            {
                                getProfile?.name === null ?
                                    <h2 className="text-2xl font-bold">{user.displayName}</h2>
                                    : <h2 className="text-2xl font-bold">{getProfile?.name}</h2>
                            }
                            {
                                getProfile?.email === null ?
                                    <p className="text-gray-400">{user.email}</p> :
                                    <p className="text-gray-400">{getProfile?.email}</p>
                            }
                        </div>
                    </div>
                    
                    <div className="w-full flex justify-end">
                        <button onClick={handleEdit} className="bg-transparent profile-btn text-white py-2 px-4 rounded-lg">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile