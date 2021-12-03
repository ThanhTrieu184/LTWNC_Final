import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AnnouncementService } from "../../services";
import { exceptionConstants } from "../../constants";

const { SUCCESS, CREATED, SERVER_ERROR } = exceptionConstants;

const initialState = {
  announcements: [],
  currentAnnouncement: null,
  isAnnouncementFetching: false,
  isAnnouncementSuccess: false,
  isAnnouncementError: false,
  announcementReturnedMessage: null,
  announcementCount: null,
};

export const createNewAnnouncement = createAsyncThunk(
  "announcement/createNewAnnouncement",
  async (info, thunkAPI) => {
    try {
      const response = await AnnouncementService.createNewAnnouncement(info);
      if (response.code === CREATED) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue({
        code: SERVER_ERROR,
        message: "Server Error",
        data: null,
      });
    }
  }
);

export const getAnnouncements = createAsyncThunk(
  "announcement/getAnnouncements",
  async (page, thunkAPI) => {
    try {
      const response = await AnnouncementService.getAnnouncements(page);
      if (response.code === SUCCESS) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue({
        code: SERVER_ERROR,
        message: "Server Error",
        data: null,
      });
    }
  }
);

export const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    clearAnnouncementState: (state) => {
      state.isAnnouncementFetching = false;
      state.isAnnouncementSuccess = false;
      state.isAnnouncementError = false;
      state.announcementReturnedMessage = null;
    },
  },
  extraReducers: {
    [createNewAnnouncement.fulfilled]: (state, { payload }) => {
      state.announcementReturnedMessage = payload.message;
      state.isAnnouncementFetching = false;
      state.isAnnouncementSuccess = true;
      state.announcements = [payload.data.announcement, ...state.announcements];
      state.announcementsCount = state.announcementsCount + 1;
      state.currentAnnouncement = payload.data.announcement;
      return state;
    },
    [createNewAnnouncement.rejected]: (state, { payload }) =>
      rejected(state, payload),
    [createNewAnnouncement.pending]: (state) => pending(state),
    [getAnnouncements.fulfilled]: (state, { payload }) => {
      state.announcements = [
        ...state.announcements,
        ...payload.data.announcements,
      ];
      state.announcementCount = payload.data.count;
      return state;
    },
  },
});

const rejected = (state, payload) => {
  state.isAnnouncementFetching = false;
  state.isAnnouncementError = true;
  state.announcementReturnedMessage = payload.message;
};

const pending = (state) => {
  state.isAnnouncementFetching = true;
};

// const fullfilled = (state, payload) => {
//   state.postReturnedMessage = payload.message;
//   state.isPostFetching = false;
//   state.isPostSuccess = true;
//   return state;
// };
