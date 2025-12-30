import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    navigation: [],
    isSidebarOpen: false,
    isRequirementModalOpen: false,
    isLoginModalOpen: false,
    isPhoneModalOpen: false,
    searchValue: "",
  },
  reducers: {
    setNavigation: (state, action) => {
      state.navigation = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    toggleRequirementModal: (state) => {
      state.isRequirementModalOpen = !state.isRequirementModalOpen;
    },
    openRequirementModal: (state) => {
      state.isRequirementModalOpen = true;
    },
    closeRequirementModal: (state) => {
      state.isRequirementModalOpen = false;
    },
    toggleLoginModal: (state) => {
      state.isLoginModalOpen = !state.isLoginModalOpen;
    },
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    openPhoneModal: (state) => {
      state.isPhoneModalOpen = true;
    },
    closePhoneModal: (state) => {
      state.isPhoneModalOpen = false;
    },
  },
});

export const {
  setNavigation,
  toggleSidebar,
  openSidebar,
  closeSidebar,
  toggleRequirementModal,
  openRequirementModal,
  closeRequirementModal,
  toggleLoginModal,
  openLoginModal,
  closeLoginModal,
  setSearchValue,
  openPhoneModal,
  closePhoneModal,
} = uiSlice.actions;
export const selectSidebarOpen = (state) => state.ui.isSidebarOpen;
export default uiSlice.reducer;
