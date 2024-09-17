import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: any | null;
}

const initialState: AuthState = {
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{  username: any }>
    ) => {
      state.username = action.payload.username;
    },
    logout: (state) => {
        state.username = null;
      },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
