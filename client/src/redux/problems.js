import { createSlice } from "@reduxjs/toolkit";

export const problemsSlice = createSlice({
  name: "problems",
  initialState: {
    problems: null,
  },
  reducers: {
    setProblems: (state, action) => {
      state.problems = action.payload;
    },
  },
});

export const { setProblems } = problemsSlice.actions;
export default problemsSlice.reducer;
