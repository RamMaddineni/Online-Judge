import { createSlice } from "@reduxjs/toolkit";

export const problemSlice = createSlice({
  name: "problem",
  initialState: {
    problem: null,
  },
  reducers: {
    setProblem: (state, action) => {
      state.problem = action.payload;
    },
  },
});

export const { setProblem } = problemSlice.actions;
export default problemSlice.reducer;
