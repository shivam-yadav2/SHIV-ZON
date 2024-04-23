import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MyContext from '../../context/MyContext';

const EditProfile = () => {
    const context = useContext(MyContext)
        
    const { profileData, setProfileData, handelEditProfile, getProfileData } = context

    const handelUpdate = () => {
        handelEditProfile()
        getProfileData()
    }
    return (
        <div className="min-h-screen flex justify-center items-center bg-transparent">
            <div className="bg-transparent bg-opacity-10 p-8 rounded-lg shadow-lg w-full max-w-md" style={{
                boxShadow: "5px 2px 25px rgba(23, 212, 212, 0.692)"
            }}>
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
                        <input type="text" id="name" name="name" value={profileData.displayName} onChange={(e)=>setProfileData({...profileData , displayName : e.target.value})} className="mt-1 p-2 w-full border border-gray-300 rounded-lg bg-transparent" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-400">Profile Url</label>
                        <input type="text" id="image" value={profileData.photoURL} onChange={(e) => setProfileData({ ...profileData, photoURL: e.target.value })} name="email" className="mt-1 p-2 w-full border border-gray-300 rounded-lg bg-transparent" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
                        <input type="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} id="email" name="email" className="mt-1 p-2 w-full border border-gray-300 rounded-lg bg-transparent" />
                    </div>
                    
                    <div className="flex justify-between">
                    <button onClick={handelUpdate} className="bg-transparent cursor-pointer hover:scale-105 active:scale-110 text-white py-2 px-4 rounded-lg" style={{
                        boxShadow: " 5px 2px 15px rgba(255, 255, 255, 0.9)"
                    }}>Save Changes</button>
                        <NavLink to='/profile'>
                            <button type="button"  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg">Cancel</button>
                        </NavLink>
                    </div>
                
            </div>
        </div>
    );
};

export default EditProfile;
