import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenMenu: false,
};

export const responsiveSlice = createSlice({
  name: "responsive",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
  },
});
