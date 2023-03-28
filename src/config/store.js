
import { configureStore } from "@reduxjs/toolkit";
import cardReducer from './cardSlice'
// import bucketSlice from "./bucketSlice";
import historySlice from "./historySlice";

const store = configureStore({
    reducer: {
        cardSlice : cardReducer,
        // bucketSlice : bucketSlice,
        historySlice : historySlice
    },
})

export default store