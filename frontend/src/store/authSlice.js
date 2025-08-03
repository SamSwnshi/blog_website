import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("jwt") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.token = action.payload;
      state.error = null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("jwt");
    },
  },
});

export const {startLoading,loginSuccess,loginFailure,logout} = authSlice.actions;

export default authSlice.reducer;