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
import { postSlice, createNewPost } from "./post.slice";
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
};
