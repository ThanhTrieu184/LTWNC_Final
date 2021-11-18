import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../services";
import { exceptionConstants } from "../../constants";

const { SUCCESS, SERVER_ERROR } = exceptionConstants;

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  returnedMessage: null,
};

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ oldPass, newPass, confirmPass }, thunkAPI) => {
    try {
      const response = await UserService.changePassword({
        oldPass,
        newPass,
        confirmPass,
      });
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.returnedMessage = null;
    },
  },
  extraReducers: {
    [changePassword.fulfilled]: (state, { payload }) =>
      fullfilled(state, payload),
    [changePassword.rejected]: (state, { payload }) => rejected(state, payload),
    [changePassword.pending]: (state) => pending(state),
  },
});

const rejected = (state, payload) => {
  state.isFetching = false;
  state.isError = true;
  state.returnedMessage = payload.message;
};

const pending = (state) => {
  state.isFetching = true;
};

const fullfilled = (state, payload) => {
  state.returnedMessage = payload.message;
  state.isFetching = false;
  state.isSuccess = true;
  return state;
};
