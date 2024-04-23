import { createSlice } from "@reduxjs/toolkit/react";
import { toast } from "react-toastify";

export const wishAdd = createSlice({
    name : "wishList",
    initialState:{
        wishList: []
    },
    reducers:{
        addToWish: (state , action)=>{
            console.log(action.payload);
            state.wishList.push(action.payload)
            toast.success(" Added To WishList Successfully")

        },
        removeToWish: (state , action)=>{
            state.wishList = state.wishList.filter(x => x.id !== action.payload.id)
            toast.success(" Removed From WishList Successfully")

        },
    }
})

export const {addToWish , removeToWish} = wishAdd.actions
export default wishAdd.reducer