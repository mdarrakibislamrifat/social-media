import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// User interface
interface UserState {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Initial state
interface AuthState {
  user: UserState | null;
}

const initialState: AuthState = {
  user: null,
};

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

// Export actions
export const { setUser, logout } = authSlice.actions;

// Correct export for the reducer
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // This was incorrect, changed to authSlice.reducer
  },
});

export default authSlice.reducer;
