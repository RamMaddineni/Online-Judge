import { createSlice } from "@reduxjs/toolkit";

export const codeInfoSlice = createSlice({
  name: "codeInfo",
  initialState: {
    codeInfo: null,
  },
  reducers: {
    setCodeInfo: (state, action) => {
      state.codeInfo = action.payload;
    },
  },
});

export const { setCodeInfo } = codeInfoSlice.actions;
export default codeInfoSlice.reducer;
