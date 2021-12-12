import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  departmentSlice,
  userSlice,
  postSlice,
  announcementSlice,
  commentSlice,
} from "./slices";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    department: departmentSlice.reducer,
    user: userSlice.reducer,
    post: postSlice.reducer,
    announcement: announcementSlice.reducer,
    comment: commentSlice.reducer,
  },
});
