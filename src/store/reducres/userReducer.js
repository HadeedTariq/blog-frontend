import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logInUser: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    authUser: (state, { payload }) => {
      state.logInUser = payload;
    },
    logOutUser: (state) => {
      state.logInUser = null;
      localStorage.removeItem("blog-user-token");
    },
  },
});

export const { logOutUser, authUser } = userSlice.actions;
export default userSlice.reducer;
