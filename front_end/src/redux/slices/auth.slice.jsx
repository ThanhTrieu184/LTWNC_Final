import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services";
import { exceptionConstants } from "../../constants";

const { SUCCESS, SERVER_ERROR } = exceptionConstants;

const initialState = {
  user: null,
  isLoggedIn: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessages: null,
};
const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  initialState["user"] = user;
  initialState["isLoggedIn"] = true;
}

export const logOut = createAsyncThunk(
  "auth/logOut",
  async ({ token }, thunkAPI) => {
    try {
      const response = await AuthService.logout({ token });
      if (response.code === SUCCESS) {
        localStorage.removeItem("user");
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
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await AuthService.login({ username, password });
      if (response.code === SUCCESS) {
        localStorage.setItem("user", JSON.stringify(response.data));
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessages = null;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.user = payload.data;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => rejected(state, payload),
    [loginUser.pending]: (state) => pending(state),
    [logOut.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isLoggedIn = false;
      state.user = null;
      state.isError = false;
      state.errorMessages = null;
      return state;
    },
    [logOut.rejected]: (state, { payload }) => rejected(state, payload),
    [logOut.pending]: (state) => pending(state),
  },
});

const rejected = (state, payload) => {
  state.isFetching = false;
  state.isError = true;
  state.errorMessages = payload.message;
};

const pending = (state) => {
  state.isFetching = true;
};
