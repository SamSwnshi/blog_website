import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    setUserLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setUserError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setUserLoading, setUserError } = userSlice.actions;

export default userSlice.reducer; 