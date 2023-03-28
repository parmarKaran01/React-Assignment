
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCardList = createAsyncThunk("cards",async() => {
    try{
        const res = await axios.get("http://localhost:8000/cardList")
        const data = res.data
        return data
    } catch (err){
        console.log("Error occurred in fetch cards thunk",err)
    }
})