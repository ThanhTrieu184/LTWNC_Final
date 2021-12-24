import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CommentService } from "../../services";
import { exceptionConstants } from "../../constants";

const { SUCCESS, CREATED, SERVER_ERROR } = exceptionConstants;

const initialState = {
  comments: [],
  isCommentFetching: false,
  isCommentSuccess: false,
  isCommentError: false,
  commentReturnedMessage: null,
  commentCount: null,
};

export const createNewComment = createAsyncThunk(
  "comment/createNewComment",
  async (value, thunkAPI) => {
    try {
      const response = await CommentService.createNewComment(value);
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

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async (value, thunkAPI) => {
    try {
      const response = await CommentService.updateComment(value);
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

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (postId, thunkAPI) => {
    try {
      const response = await CommentService.getComments(postId);
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

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (commentId, thunkAPI) => {
    try {
      const response = await CommentService.deleteComment(commentId);
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

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearCommentState: (state) => {
      state.isCommentFetching = false;
      state.isCommentSuccess = false;
      state.isCommentError = false;
      state.commentReturnedMessage = null;
    },
    enableLoading: (state) => {
      state.isCommentFetching = true;
    },
    disableLoading: (state) => {
      state.isCommentFetching = false;
    },
  },
  extraReducers: {
    [createNewComment.fulfilled]: (state, { payload }) => {
      state.commentReturnedMessage = payload.message;
      state.isCommentFetching = false;
      state.isCommentSuccess = true;
      // state.comments = [payload.data.comment, ...state.comments];
      // state.commentCount = state.commentCount + 1;
      return state;
    },
    [createNewComment.rejected]: (state, { payload }) =>
      rejected(state, payload),
    [createNewComment.pending]: (state) => pending(state),
    [getComments.fulfilled]: (state, { payload }) => {
      // state.comments = payload.data.comments;
      // if (state.commentCount !== payload.data.count)
      //   state.commentCount = payload.data.count;
      state.isCommentFetching = false;
      return state;
    },
    [getComments.pending]: (state) => pending(state),
    [updateComment.fulfilled]: (state, { payload }) => {
      state.commentReturnedMessage = payload.message;
      state.isCommentFetching = false;
      state.isCommentSuccess = true;
      state.comments = state.comments.map((c) =>
        c._id === payload.data.comment._id ? (c = payload.data.comment) : c
      );
      state.commentCount = state.commentCount - 1;
      return state;
    },
    [updateComment.rejected]: (state, { payload }) => rejected(state, payload),
    [updateComment.pending]: (state) => pending(state),
    [deleteComment.pending]: (state) => pending(state),
    [deleteComment.fulfilled]: (state, { payload }) => {
      state.isCommentFetching = false;
      state.comments = state.comments.filter(
        (c) => c._id !== payload.data.deletedComment._id
      );
      return state;
    },
    [deleteComment.rejected]: (state, { payload }) => rejected(state, payload),
  },
});

const rejected = (state, payload) => {
  state.isCommentFetching = false;
  state.isCommentError = true;
  state.commentReturnedMessage = payload.message;
};

const pending = (state) => {
  state.isCommentFetching = true;
};
