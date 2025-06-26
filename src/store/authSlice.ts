import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user?: any }>) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user || null;
      state.error = null;
      state.loading = false;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { loginSuccess, logout, setToken, setUser, setError, setLoading } = authSlice.actions;
export default authSlice.reducer; 