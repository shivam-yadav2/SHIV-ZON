import React, { useEffect, useState } from 'react'
import MyContext from './MyContext'
import { toast } from 'react-toastify'
import { addDoc, collection, getDoc, setDoc, doc, Timestamp, query, onSnapshot, orderBy, deleteDoc, getDocs } from 'firebase/firestore'
import { auth, fireDB } from '../Firebase/Firebase'
import { updateEmail, updateProfile } from 'firebase/auth'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function MyState(props) {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        imageUrl: "",
        description: "",
        category: "",
        time:Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    })

    const addProduct = async () => {
        const productRef = collection(fireDB, 'AllProducts')

        const { title, price, imageUrl, description, category } = product
        if (title == "" || price == "" || imageUrl == "" || description == " " || category == "") {
            return toast.warning("All Fields are Required")
        }
        else {
            try {
                await addDoc(productRef, product)
                getData()
                toast.success("Product Added")
                setTimeout(() => {
                    window.location.href = '/dashboard'
                }, 1000);

            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    const [getProduct, setGetProduct] = useState([])

    const getData = async () => {
        try {
            const q = query(
                collection(fireDB, "AllProducts"),
                orderBy("time"),
                // limit(5)
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productsArray = [];
                QuerySnapshot.forEach((doc) => {
                    productsArray.push({ ...doc.data(), id: doc.id });
                });
                // console.log(productsArray)
                setGetProduct(productsArray)
            });
            return () => data;
            console.log(getProduct)
        } catch (error) {
            console.log(error)
        }
    }



    const editHandel = (props) => {
        setProduct(props)
    }

    const updateProduct = async () => {
        await setDoc(doc(fireDB, 'AllProducts', product.id), product)
        getData()
        toast.success("Product Updated Successfully")
        setTimeout(() => {
            window.location.href = '/dashboard'
        }, 1000)
    }

    const deleteProduct = async (item) => {
        try {
            await deleteDoc(doc(fireDB, 'AllProducts', item.id))
            toast.success("Product Deleted Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const [profileData, setProfileData] = useState({
        displayName: "",
        photoURL: "",
        email:""
    })

    const handelEditProfile = async () => {
        console.log("first")
        if (profileData.displayName === "" || profileData.photoURL === "" || profileData.email === "") {
            toast.warning("Fill All Fields")
        }
        else {
            try {
                await updateProfile(auth.currentUser, {
                    displayName: profileData.displayName,
                    photoURL: profileData.photoURL
                }).then(() => {
                    Cookies.set('accessToken', auth.currentUser.accessToken)
                })
                await updateEmail(auth.currentUser, profileData.email).then(() => {
                    Cookies.set('accessToken' , auth.currentUser.accessToken)
                    toast.success("Profile Updated")
                    setTimeout(() => {
                        window.location.href = '/profile'
                        getProfileData()
                    }, 1200);
                })
                
            } catch (error) {
                console.log(error)
                toast.error("An Error Occurred")
            }
        }
    }

    const [getProfile, setGetProfile] = useState(null)

    const getProfileData =  () => {
        const user =  auth?.currentUser
        setGetProfile(user)
        console.log(user)
    }

    useEffect(() => {
        getProfileData()
        getData()
        getOrderData()
        getUserData()
    }, [])
    
    const [totalAmount, setTotalAmount] = useState(null)

    const [productInfo, setProductInfo] = useState('')


    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        
        try {
            const result = await getDocs(collection(fireDB, "orders"))
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
                
            });
            setOrder(ordersArray);
            console.log(ordersArray)
            
        } catch (error) {
            console.log(error)
            
        }
    }

    const [user, setUser] = useState([]);

    const getUserData = async () => {
        
        try {
            const result = await getDocs(collection(fireDB, "users"))
            console.log(result)
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                
            });
            setUser(usersArray);
            console.log(usersArray)
            
        } catch (error) {
            console.log(error)
            
        }
    }

    return (
        <MyContext.Provider value={{ product, setProduct, addProduct, editHandel, updateProduct, getProduct, getData, deleteProduct, totalAmount, setTotalAmount, handelEditProfile, profileData, setProfileData, getProfileData, getProfile, setGetProfile, productInfo, setProductInfo, order, user }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState