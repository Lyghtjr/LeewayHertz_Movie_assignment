import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  original: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.original = action.payload.original;
    },
  },
});

export const { setMovies } = movieSlice.actions;

export const selectOriginal = (state) => state.movie.original;

export default movieSlice.reducer;
