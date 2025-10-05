import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching data
export const fetchData = createAsyncThunk('posts/fetchData', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json(); // ✅ await this
  return data;
});

const ApiSlice = createSlice({
  name: "posts",
  initialState: {
    isLoading: false,
    data: [],        // ✅ start with empty array (not null)
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;  // ✅ save fetched data here
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // ✅ handle error properly
      });
  },
});

export default ApiSlice.reducer;
