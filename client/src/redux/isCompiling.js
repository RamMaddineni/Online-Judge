import { createSlice } from "@reduxjs/toolkit";

export const isCompilingSlice = createSlice({
  name: "isCompiling",
  initialState: {
    isCompiling: null,
  },
  reducers: {
    setIsCompiling: (state, action) => {
      state.isCompiling = action.payload;
    },
  },
});

export const { setIsCompiling } = isCompilingSlice.actions;
export default isCompilingSlice.reducer;
