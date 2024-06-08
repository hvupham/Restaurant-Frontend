import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const foodSlice = createSlice({
  name: "foods",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchFoods.fulfilled, (state, action) => {
      state.data = action.payload
    });
  },
});

export default foodSlice.reducer;

export const fetchFoods = createAsyncThunk("Food/fetch", async () => {
  try {
    const res = await fetch(`http://localhost:5454/foods`);
    const data = await res.json();
    
    // console.log(data); // Log dữ liệu từ phản hồi
    return data; // Trả về dữ liệu để lưu vào store Redux
  } catch (error) {
    console.error("Fetch foods error:", error);
    throw error;
  }
});

