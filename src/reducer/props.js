import { createSlice } from "@reduxjs/toolkit";

const props = createSlice({
  name: "props",
  initialState: {
    imgsdomain: `https://images.hfyali.com`,
  },
  reducers: {
    setImgsDomain: (state, actions) => {
      state.imgsdomain = actions.payload;
    },
  },
});
export default props.reducer;
export const { setImgsDomain } = props.actions;
