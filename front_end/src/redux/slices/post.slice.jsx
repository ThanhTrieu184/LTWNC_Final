import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostService } from "../../services";
import { exceptionConstants } from "../../constants";

const { SUCCESS, CREATED, SERVER_ERROR } = exceptionConstants;

const initialState = {
  posts: [],
  currentPost: null,
  isPostFetching: false,
  isPostSuccess: false,
  isPostError: false,
  postReturnedMessage: null,
  count: null,
};

export const createNewPost = createAsyncThunk(
  "post/createNewPost",
  async (info, thunkAPI) => {
    try {
      const response = await PostService.createNewPost(info);
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

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (page, thunkAPI) => {
    try {
      const response = await PostService.getPosts(page);
      if (response.code === SUCCESS) {
        console.log(response);
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

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPostState: (state) => {
      state.isPostFetching = false;
      state.isPostSuccess = false;
      state.isPostError = false;
      state.postReturnedMessage = null;
    },
  },
  extraReducers: {
    [createNewPost.fulfilled]: (state, { payload }) => {
      state.postReturnedMessage = payload.message;
      state.isPostFetching = false;
      state.isPostSuccess = true;
      state.posts = [payload.data.post, ...state.posts];
      state.count = state.count + 1;
      return state;
    },
    [createNewPost.rejected]: (state, { payload }) => rejected(state, payload),
    [createNewPost.pending]: (state) => pending(state),
    [getPosts.fulfilled]: (state, { payload }) => {
      state.posts = [...state.posts, ...payload.data.posts];
      state.count = payload.data.count;
      return state;
    },
  },
});

const rejected = (state, payload) => {
  state.isPostFetching = false;
  state.isPostError = true;
  state.postReturnedMessage = payload.message;
};

const pending = (state) => {
  state.isPostFetching = true;
};

// const fullfilled = (state, payload) => {
//   state.postReturnedMessage = payload.message;
//   state.isPostFetching = false;
//   state.isPostSuccess = true;
//   return state;
// };
