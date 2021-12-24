import { createSlice } from "@reduxjs/toolkit";

const theme = localStorage.getItem("theme");

const initialState = {
  isOpenMenu: false,
  userTheme: theme || "light",
};

export const responsiveSlice = createSlice({
  name: "responsive",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
    setUserTheme: (state, { payload }) => {
      state.userTheme = payload.theme;
      localStorage.setItem("theme", payload.theme);
    },
  },
});
