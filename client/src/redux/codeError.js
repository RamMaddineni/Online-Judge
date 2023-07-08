import { createSlice } from "@reduxjs/toolkit";

export const codeErrorSlice = createSlice({
  name: "codeError",
  initialState: {
    codeError: null,
  },
  reducers: {
    setCodeError: (state, action) => {
      state.codeError = action.payload;
    },
  },
});

export const { setCodeError } = codeErrorSlice.actions;
export default codeErrorSlice.reducer;
