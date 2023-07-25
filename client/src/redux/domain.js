import { createSlice } from "@reduxjs/toolkit";

export const domainSlice = createSlice({
  name: "domain",
  initialState: {
    domain: "http://43.204.24.195:3001",
    // domain: "http://localhost:3001",
  },
  reducers: {},
});

// export const {  } = domainSlice.actions;
export default domainSlice.reducer;
