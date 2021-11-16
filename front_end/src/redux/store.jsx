import { configureStore } from "@reduxjs/toolkit";
import { authSlice, departmentSlice } from "./slices";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    department: departmentSlice.reducer,
  },
});
