import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import problemsReducer from "./problems";
import errorMessageReducer from "./errorMessage";
import problemReducer from "./problem";
import codeErrorReducer from "./codeError";
import codeInfoReducer from "./codeInfo";
import isCompilingReducer from "./isCompiling";
export default configureStore({
  reducer: {
    user: userReducer,
    problems: problemsReducer,
    errorMessage: errorMessageReducer,
    problem: problemReducer,
    codeError: codeErrorReducer,
    codeInfo: codeInfoReducer,
    isCompiling: isCompilingReducer,
  },
});
