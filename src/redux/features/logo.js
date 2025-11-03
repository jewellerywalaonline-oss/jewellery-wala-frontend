import { createSlice } from "@reduxjs/toolkit";

const getInitialState = (preloadedState) => ({
  logo: preloadedState?._data?.[0]?.logo || null,
});

const logoSlice = createSlice({
  name: "logo",
  initialState: getInitialState(),
  reducers: {
    setLogo: (state, action) => {
      state.logo = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase("REPLACE_STATE", (state, action) => {
      return getInitialState(action.payload?.logo);
    });
  },
});

export const { setLogo } = logoSlice.actions;
export default logoSlice.reducer;
