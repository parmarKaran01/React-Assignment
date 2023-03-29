import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { fetchCardList } from "./thunk";

const initialState = {
  buckets: {
    ["mainList"]: {
      name: "main",
      items: [],
    },
  },

  cardListLoading : false,
  cardListError : false,
};

const bucketSlice = createSlice({
  name: "bucketSlice",
  initialState: initialState,
  reducers: {
    addBucket(state, action) {
      const payload = action.payload;
      const newState = { ...state.buckets, ...payload };
      state.buckets = newState;
    },
    updateBucketChildren(state, action) {
      state.buckets = action.payload;
    },
    updateItems(state, action) {
      const newObj = current(state.buckets);
      console.log("into fhiashia scascoiahsoicasic", newObj);

      if (newObj.buckets) {
        newObj.buckets[action.payload.parentId].items = action.payload.newList;
        // state.buckets[action.payload.parentId].items = action.payload.newList;
        
      }
      state.buckets = newObj
    },
    updateBucket(state, action) {
      state.buckets = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCardList.pending, (state) => {
      state.cardListLoading = true;
    })
    .addCase(fetchCardList.rejected, (state) => {
      state.cardListError = true
    })

    .addCase(fetchCardList.fulfilled, (state, action) => {
      state.buckets["mainList"].items = action.payload
      state.cardListLoading = false
    })
  }
});

export const bucketStateSelector = (state) => state.bucketSlice;
export const { addBucket, updateBucketChildren, updateItems, updateBucket } =
  bucketSlice.actions;
export default bucketSlice.reducer;
