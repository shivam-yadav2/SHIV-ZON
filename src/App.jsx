import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'


import Home from './pages/home/Home'
import Navbar from './components/Navbar'
import Wishlist from './pages/wishlist/Wishlist'
import Cart from './pages/cart/Cart'
import Login from './pages/authentication/Login'
import Signup from './pages/authentication/Signup'
import Accessories from './pages/accessories/Accessories.jsx'
import Error from './pages/Error/Error'
import Dashboard from './pages/admin/Dashboard'
import About from './pages/about/About'
import Contact from './pages/Contact/Contact'
import MyState from './context/MyState'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from './pages/addProduct/AddProduct'
import UpdateProduct from './pages/updateProduct/UpdateProduct'
import AllProducts from './pages/allproducts/AllProducts'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/editprofile/Editprofile'
import BuyNow from './components/buyNow/BuyNow'
import ProductInfo from './pages/productInfo/ProductInfo'

function App() {

  return (
    <>
      <MyState>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/allproducts' element={<AllProducts />} />
            <Route path='/nav' element={<Navbar />} />
            <Route path='/asses' element={<Accessories />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<Signup />} />
            <Route path='/*' element={<Error />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/dashboard' element={
              <ProtectedRouteAdmin>
                <Dashboard />
              </ProtectedRouteAdmin>
            } />
            <Route path='/about' element={<About />} />
            <Route path='/buy' element={<BuyNow />} />
            <Route path='/info' element={<ProductInfo />} />
            <Route path='/addproduct' element={
              <ProtectedRouteAdmin>
                <AddProduct />
              </ProtectedRouteAdmin>
            } />
            <Route path='/updateproduct' element={
              <ProtectedRouteAdmin>
                <UpdateProduct />
              </ProtectedRouteAdmin>
            } />
            <Route path='/editprofile' element={<EditProfile />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </MyState>
    </>
  )
}

export default App


export const ProtectedRouteUser = ({ children }) => {
  const user = Cookies.get('accessToken')
  const decode = user && jwtDecode(user)


  if (decode) {
    return children
  }
  else {
    return <Navigate to={'/login'} />
  }
}

export const ProtectedRouteAdmin = ({ children }) => {
  const admin = Cookies.get('accessToken')
  const decode = admin && jwtDecode(admin)
  

  if (decode.email === 'shiv@admin.com') {
    return children
  }
  else {
    return <Navigate to={'/login'} />
  }
}