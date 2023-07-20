import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  character: null,
};

export const guestCharacterSlice = createSlice({
  name: "guestCharacter",
  initialState,
  reducers: {
    createGuestCharacter: (state, action) => {
      const { character } = action.payload;
      return { character };
    },

    deleteGuestCharacter: (state, action) => {
      return initialState;
    },
  },
});

export const { createGuestCharacter, deleteGuestCharacter } =
  guestCharacterSlice.actions;

export default guestCharacterSlice.reducer;
