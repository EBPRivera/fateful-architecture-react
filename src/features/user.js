import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { id, token } = action.payload;
      return { id, token };
    },

    logout: (state, action) => {
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
