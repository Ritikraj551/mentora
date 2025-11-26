import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    creatorCourseData: null,
  },
  reducers: {
    setCeatorCourseData: (state, action) => {
      state.creatorCourseData = action.payload;
    },
  },
});

export const { setCeatorCourseData } = courseSlice.actions;
export default courseSlice.reducer;
