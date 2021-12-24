import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AnnouncementService } from "../../services";
import { exceptionConstants } from "../../constants";

const { SUCCESS, CREATED, SERVER_ERROR } = exceptionConstants;

const initialState = {
  announcements: [],
  homePageAnnouncements: [],
  currentAnnouncement: null,
  isAnnouncementFetching: false,
  isAnnouncementSuccess: false,
  isAnnouncementError: false,
  announcementReturnedMessage: null,
  announcementCount: null,
  currentLocation: null,
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

export const updateAnnouncement = createAsyncThunk(
  "announcement/updateAnnouncement",
  async (info, thunkAPI) => {
    try {
      const response = await AnnouncementService.updateAnnouncement(info);
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
export const getAnnouncementsByDepartment = createAsyncThunk(
  "announcement/getAnnouncementsByDepartment",
  async ({ departmentId, page }, thunkAPI) => {
    try {
      const response = await AnnouncementService.getAnnouncementsByDepartment(
        departmentId,
        page
      );
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

export const getAnnouncementById = createAsyncThunk(
  "announcement/getAnnouncementById",
  async (announcementId, thunkAPI) => {
    try {
      const response = await AnnouncementService.getAnnouncementById(
        announcementId
      );
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

export const getHomePageAnnouncements = createAsyncThunk(
  "announcement/getHomePageAnnouncements",
  async (_, thunkAPI) => {
    try {
      const response = await AnnouncementService.getHomePageAnnouncements();
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

export const deleteAnnouncement = createAsyncThunk(
  "announcement/deleteAnnouncement",
  async (values, thunkAPI) => {
    try {
      const response = await AnnouncementService.deleteAnnouncement(values);
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
    setLocation: (state, { payload }) => {
      state.currentLocation = payload;
    },
  },
  extraReducers: {
    [createNewAnnouncement.fulfilled]: (state, { payload }) => {
      state.announcementReturnedMessage = payload.message;
      state.isAnnouncementFetching = false;
      state.isAnnouncementSuccess = true;
      state.announcements = [payload.data.announcement, ...state.announcements];
      state.homePageAnnouncements =
        state.homePageAnnouncements.length > 0
          ? [payload.data.announcement, ...state.homePageAnnouncements]
          : [];
      state.announcementsCount = state.announcementsCount + 1;
      state.currentAnnouncement = payload.data.announcement;
      return state;
    },
    [createNewAnnouncement.rejected]: (state, { payload }) =>
      rejected(state, payload),
    [createNewAnnouncement.pending]: (state) => pending(state),
    [getAnnouncements.fulfilled]: (state, { payload }) => {
      state.announcements = [...payload.data.announcements];
      if (state.announcementCount !== payload.data.count)
        state.announcementCount = payload.data.count;
      state.isAnnouncementFetching = false;
      return state;
    },
    [getAnnouncements.pending]: (state) => pending(state),
    [getAnnouncementsByDepartment.fulfilled]: (state, { payload }) => {
      state.announcements = [...payload.data.announcements];
      if (state.announcementCount !== payload.data.count)
        state.announcementCount = payload.data.count;
      state.isAnnouncementFetching = false;
      return state;
    },
    [getAnnouncementsByDepartment.rejected]: (state, { payload }) => {
      state.isAnnouncementFetching = false;
      state.isAnnouncementError = true;
      state.announcementReturnedMessage = payload.message;
      state.announcements = [];
      state.announcementCount = 0;
    },
    [getAnnouncementsByDepartment.pending]: (state) => pending(state),
    [getAnnouncementById.pending]: (state) => pending(state),
    [getAnnouncementById.fulfilled]: (state, { payload }) => {
      state.isAnnouncementFetching = false;
      state.currentAnnouncement = payload.data.announcement;
      return state;
    },
    [getHomePageAnnouncements.fulfilled]: (state, { payload }) => {
      state.homePageAnnouncements = payload.data.announcements;
      return state;
    },
    [updateAnnouncement.fulfilled]: (state, { payload }) => {
      state.announcementReturnedMessage = payload.message;
      state.isAnnouncementFetching = false;
      state.isAnnouncementSuccess = true;
      state.homePageAnnouncements = state.homePageAnnouncements.map((a) =>
        a._id === payload.data.announcement._id
          ? (a = payload.data.announcement)
          : a
      );
      state.announcementsCount = state.announcementsCount - 1;
      state.currentAnnouncement = null;
      return state;
    },
    [updateAnnouncement.rejected]: (state, { payload }) =>
      rejected(state, payload),
    [updateAnnouncement.pending]: (state) => pending(state),
    [deleteAnnouncement.pending]: (state) => pending(state),
    [deleteAnnouncement.fulfilled]: (state, { payload }) => {
      state.isAnnouncementFetching = false;
      state.homePageAnnouncements = state.homePageAnnouncements.filter(
        (a) => a._id !== payload.data.deletedAnnouncement._id
      );
      state.announcements = state.announcements.filter(
        (a) => a._id !== payload.data.deletedAnnouncement._id
      );
      return state;
    },
    [deleteAnnouncement.rejected]: (state, { payload }) =>
      rejected(state, payload),
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
