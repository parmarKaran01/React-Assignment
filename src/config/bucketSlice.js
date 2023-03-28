// import { createSlice } from "@reduxjs/toolkit";
// import { fetchCardList } from "./thunk";

// const initialState = {
//   buckets: [
//     {
//       name: "Entertainment",
//       children: [
//         {
//           id: "d32318d2-8f93-4a3c-8436-d78a0aefa1da",
//           name: "Rahul Subramanian | Crowd Work in London | Part 1",
//           videoURL: "https://www.youtube.com/watch?v=BfwUjNr5QCs",
//         },
//         {
//           id: "5818f27a-e57a-47c5-a795-45dd2bb35416",
//           name: "Learn useCallback In 8 Minutes",
//           videoURL: "https://www.youtube.com/watch?v=_AyFP5s69N4",
//         },
//       ],
//     },
//   ],
// };

// const bucketSlice = createSlice({
//   name: "bucketSlice",
//   initialState: initialState,
//   reducers: {
//     addBucket(state, action) {
//       state.buckets.push(action.payload);
//     },
//     updateBucketChildren(state, action) {
//       state.buckets.children.push = action.payload;
//     },
//     removeBucketChildren(state, action) {
//       state.buckets.children.filter((item) => item.id !== action.payload);
//     },
//   },
// });

// export const bucketStateSelector = (state) => state.bucketSlice;
// export const {addBucket, updateBucketChildren, removeBucketChildren} = bucketSlice.actions
// export default bucketSlice.reducer;
