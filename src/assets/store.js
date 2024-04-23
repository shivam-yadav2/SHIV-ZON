import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../Cart/CartSlice";
import WishSlice from "../Cart/WishSlice";


const cart = configureStore({
    reducer: {
        CartSlice,
        WishSlice,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default cart