import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostService } from "../../services";
import { exceptionConstants } from "../../constants";

const { SUCCESS, CREATED, SERVER_ERROR } = exceptionConstants;

const initialState = {
  posts: [],
  currentPost: null,
  profilePosts: [],
  profileCount: null,
  profileId: null,
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

export const getProfilePosts = createAsyncThunk(
  "post/getProfilePosts",
  async (data, thunkAPI) => {
    try {
      const response = await PostService.getProfilePosts(
        data.userId,
        data.page
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

export const getPostById = createAsyncThunk(
  "post/getPostById",
  async (postId, thunkAPI) => {
    try {
      const response = await PostService.getPostById(postId);
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

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (data, thunkAPI) => {
    try {
      const response = await PostService.updatePost(data.postId, data.values);
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

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, thunkAPI) => {
    try {
      const response = await PostService.deletePost(postId);
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
      if (payload.data.post.posted_by._id === state.profileId) {
        state.profilePosts = [payload.data.post, ...state.profilePosts];
        state.profileCount = state.profileCount + 1;
      }
      return state;
    },
    [createNewPost.rejected]: (state, { payload }) => rejected(state, payload),
    [createNewPost.pending]: (state) => pending(state),
    [getPosts.fulfilled]: (state, { payload }) => {
      state.posts = [...state.posts, ...payload.data.posts];
      state.count = payload.data.count;
      state.isPostFetching = false;
      return state;
    },
    [getPosts.rejected]: (state, { payload }) => rejected(state, payload),
    [getPosts.pending]: (state) => pending(state),
    [getProfilePosts.fulfilled]: (state, { payload }) => {
      if (payload.data.userId !== state.profileId) {
        state.profilePosts = payload.data.posts;
      } else {
        state.profilePosts = [...state.profilePosts, ...payload.data.posts];
      }
      state.profileCount = payload.data.count;
      state.profileId = payload.data.userId;
      state.isPostFetching = false;
      return state;
    },
    [getProfilePosts.rejected]: (state, { payload }) =>
      rejected(state, payload),
    [getProfilePosts.pending]: (state) => pending(state),
    [getPostById.fulfilled]: (state, { payload }) => {
      state.isPostFetching = false;
      state.currentPost = payload.data.post;
      return state;
    },
    [getPostById.rejected]: (state, { payload }) => rejected(state, payload),
    [getPostById.pending]: (state) => pending(state),
    [updatePost.fulfilled]: (state, { payload }) => {
      state.postReturnedMessage = payload.message;
      state.isPostFetching = false;
      state.isPostSuccess = true;
      state.posts = state.posts.map((p) =>
        p._id === payload.data.post._id ? (p = payload.data.post) : p
      );
      state.currentPost = null;
      return state;
    },
    [updatePost.rejected]: (state, { payload }) => rejected(state, payload),
    [updatePost.pending]: (state) => pending(state),
    [deletePost.fulfilled]: (state, { payload }) => {
      state.postReturnedMessage = payload.message;
      state.isPostFetching = false;
      state.isPostSuccess = true;
      state.posts = state.posts.filter(
        (p) => p._id !== payload.data.deletedPost._id
      );
      if (
        state.profilePosts
          .map((p) => p._id)
          .includes(payload.data.deletedPost._id)
      ) {
        state.profilePosts = state.profilePosts.filter(
          (p) => p._id !== payload.data.deletedPost._id
        );
        state.profileCount = state.profileCount - 1;
      }
      state.count = state.count - 1;
      return state;
    },
    [deletePost.rejected]: (state, { payload }) => rejected(state, payload),
    [deletePost.pending]: (state) => pending(state),
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
