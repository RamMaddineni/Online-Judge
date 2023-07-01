import { createSlice } from "@reduxjs/toolkit";

export const errorMessageSlice = createSlice({
  name: "errorMessage",
  initialState: {
    errorMessage: null,
  },
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setErrorMessage } = errorMessageSlice.actions;
export default errorMessageSlice.reducer;
