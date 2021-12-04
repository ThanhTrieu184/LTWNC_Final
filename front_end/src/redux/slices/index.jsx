import {
  authSlice,
  logOut,
  loginGoogle,
  loginUser,
  verifyUser,
} from "./auth.slice";
import {
  departmentSlice,
  getAllDepartments,
  getDepartmentsByUser,
} from "./department.slice";
import {
  userSlice,
  changePassword,
  createNewUser,
  updateProfile,
} from "./user.slice";
import { postSlice, createNewPost, getPosts } from "./post.slice";
import {
  announcementSlice,
  createNewAnnouncement,
  getAnnouncements,
  getHomePageAnnouncements,
} from "./announcement.slice";

export {
  authSlice,
  logOut,
  loginGoogle,
  loginUser,
  departmentSlice,
  getAllDepartments,
  userSlice,
  changePassword,
  verifyUser,
  createNewUser,
  getDepartmentsByUser,
  updateProfile,
  postSlice,
  createNewPost,
  getPosts,
  announcementSlice,
  createNewAnnouncement,
  getAnnouncements,
  getHomePageAnnouncements,
};
