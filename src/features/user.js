import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  token: null,
  isGuest: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { id, token } = action.payload;
      return { ...initialState, id, token };
    },

    logout: (state, action) => {
      return initialState;
    },

    guestLogin: (state, action) => {
      return { ...initialState, isGuest: true };
    },
  },
});

export const { login, logout, guestLogin } = userSlice.actions;

export default userSlice.reducer;
