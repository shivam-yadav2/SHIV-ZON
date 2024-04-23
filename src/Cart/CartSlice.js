import { createSlice } from "@reduxjs/toolkit/react";
import { toast } from "react-toastify";

const initialState = {
    cart :[]
};

export const cartAdd = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state , action)=>{
            state.cart.push(action.payload)
            toast.success(" Added To Cart Successfully")
        },
        removeToCart: (state , action)=>{
            state.cart = state.cart.filter(x => x.id !== action.payload.id)
            toast.success(" Removed From Cart Successfully")
        },
    }
})



export const {addToCart , removeToCart} = cartAdd.actions
export default cartAdd.reducer
