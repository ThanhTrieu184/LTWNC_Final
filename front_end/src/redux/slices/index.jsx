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
import {
  postSlice,
  createNewPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getProfilePosts,
} from "./post.slice";
import {
  announcementSlice,
  createNewAnnouncement,
  getAnnouncements,
  getHomePageAnnouncements,
  getAnnouncementsByDepartment,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
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
  getPostById,
  updatePost,
  deletePost,
  getProfilePosts,
  announcementSlice,
  createNewAnnouncement,
  getAnnouncements,
  getHomePageAnnouncements,
  getAnnouncementsByDepartment,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
};
