import { createSlice } from "@reduxjs/toolkit";
import { fetchCardList } from "./thunk";

const initialState = {
  cardList: [],
  cardListLoading :false,
  cardListError: false,
};

const cardSlice = createSlice({
  name: "cardSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCardList.pending, (state) => {
      state.cardListLoading = true;
    })
    .addCase(fetchCardList.rejected, (state) => {
      state.cardListError = true
    })

    .addCase(fetchCardList.fulfilled, (state, action) => {
      state.cardList = action.payload
      state.cardListLoading = false
    })
  }
});




export const cardStateSelector = (state) => state.cardSlice

export default cardSlice.reducer;
