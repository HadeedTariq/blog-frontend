import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlogPosts = createAsyncThunk(
  "fetchBlogPosts",
  async (url) => {
    const { data } = await axios.get(`${url}/blog`);
    return data;
  }
);

const initialState = {
  allBlogs: [],
  singlePost: null,
  isLoading: false,
  error: null,
  singleError: null,
  successMessage: null,
  currentPage: 1,
  recordPerPage: 4,
};

const blogReducer = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    getSinglePost: (state, { payload }) => {
      const post = state.allBlogs?.find((post) => post._id === payload);
      if (post) {
        state.singlePost = post;
      } else {
        state.singleError = "Blog post not found 🙃";
      }
    },
    setSuccessMessage: (state, { payload }) => {
      state.successMessage = payload;
    },
    setSingleError: (state, { payload }) => {
      state.singleError = null;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogPosts.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allBlogs = action.payload;
      }),
      builder.addCase(fetchBlogPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  getSinglePost,
  setSuccessMessage,
  setSingleError,
  setCurrentPage,
} = blogReducer.actions;

export default blogReducer.reducer;
