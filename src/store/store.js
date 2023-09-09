import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducres/userReducer";
import blogReducer from "./reducres/blogReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blogPosts: blogReducer,
  },
});
