import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DepartmentService } from "../../services";
import { exceptionConstants } from "../../constants";

const { SUCCESS, SERVER_ERROR } = exceptionConstants;

const initialState = {
  departments: [],
  choosedItems: [],
  departmentsOfUser: [],
};

export const getAllDepartments = createAsyncThunk(
  "department/getAllDepartments",
  async (_, thunkAPI) => {
    try {
      const response = await DepartmentService.getAllDepartments();

      if (response.code === SUCCESS) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue({
        code: SERVER_ERROR,
        message: "Lỗi server!",
        data: [],
      });
    }
  }
);

export const getDepartmentsByUser = createAsyncThunk(
  "department/getDepartmentsByUser",
  async (_, thunkAPI) => {
    try {
      const response = await DepartmentService.getDepartmentsByUser();

      if (response.code === SUCCESS) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue({
        code: SERVER_ERROR,
        message: "Lỗi server!",
        data: [],
      });
    }
  }
);

export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    clearDepartmentState: (state) => {
      state.choosedItems = [];
      state.departmentsOfUser = [];
      state.departments = [];
    },
    clearChoosedItem: (state) => {
      state.choosedItems = [];
    },
    addItem: (state, { payload }) => {
      state.choosedItems = [...state.choosedItems, payload];
    },
    removeItem: (state, { payload }) => {
      state.choosedItems = state.choosedItems.filter(
        (i) => i._id !== payload._id
      );
    },
  },
  extraReducers: {
    [getAllDepartments.fulfilled]: (state, { payload }) => {
      state.departments = payload.data;
      return state;
    },
    [getDepartmentsByUser.fulfilled]: (state, { payload }) => {
      state.departmentsOfUser = state.departments.filter((d) =>
        payload.data.includes(d._id)
      );
      return state;
    },
  },
});
