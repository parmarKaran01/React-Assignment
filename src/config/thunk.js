
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "./constant";

export const fetchCardList = createAsyncThunk("cards",async() => {
    try{
        const res = await axios.get(APP_URL)
        const data = res.data
        return data
    } catch (err){
        console.log("Error occurred in fetch cards thunk",err)
    }
})