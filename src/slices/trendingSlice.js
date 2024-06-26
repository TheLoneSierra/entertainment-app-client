// slices/trendingSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTrending = createAsyncThunk(
  'trending/fetchTrending',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/data/trending`
    );
    return response.data;
  }
);

const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default trendingSlice.reducer;
