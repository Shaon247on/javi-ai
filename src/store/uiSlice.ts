import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  chatDrawerOpen: boolean;
}

const initialState: UIState = {
  sidebarOpen: true,
  chatDrawerOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setOpenSidebar(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    setOpenChatDrawer(state, action: PayloadAction<boolean>) {
      state.chatDrawerOpen = action.payload;
    },
  },
});

export const { setOpenSidebar, setOpenChatDrawer } = uiSlice.actions;
export default uiSlice.reducer; 