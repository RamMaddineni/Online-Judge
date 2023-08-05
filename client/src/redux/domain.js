import { createSlice } from "@reduxjs/toolkit";

export const domainSlice = createSlice({
  name: "domain",
  initialState: {
    // domain: "http://35.154.187.189:3001",
    domain: "http://localhost:3001",
  },
  reducers: {},
});

// export const {  } = domainSlice.actions;
export default domainSlice.reducer;
