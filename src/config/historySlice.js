import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  historyList: [
    // {
    //   id: "0576b140-ef3b-4b57-8fde-e9a083979eec",
    //   name: "Mastering React Memo",
    //   videoURL: "hello world",
    // },
    // {
    //   id: "79b2258f-eda5-4986-8a27-d99e2035d3cf",
    //   name: "How To Get High Paying Jobs In Any Company? | Tanay Pratap | Josh Talks",
    //   videoURL: "https://www.youtube.com/watch?v=6RMz9HoGnY0",
    // },
    // {
    //   id: "e828380f-8cf0-4449-bacc-bd2d7a170ce6",
    //   name: "Full React Tutorial #18 - Conditional Loading Message",
    //   videoURL: "https://www.youtube.com/watch?v=sZjlEKbaykc&t=1391s",
    // },
  ],
};

const historySlice = createSlice({
  name: "historySlice",
  initialState: initialState,
  reducers: {
    addVideoToHistory(state, action) {
      if (!state.historyList.find((item) => item.id === action.payload.id)) {
        state.historyList.push(action.payload);
      }
    },
  },
});

export const historyStateSelector = (state) => state.historySlice;
export const { addVideoToHistory } = historySlice.actions;
export default historySlice.reducer;
