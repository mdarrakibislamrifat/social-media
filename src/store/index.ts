import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: UserState | null;
}

const getInitialUser = (): UserState | null => {
  if (typeof window === "undefined") return null;
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    return null;
  }
};

const initialState: AuthState = {
  user: getInitialUser(),
};

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

export const { setUser, logout } = authSlice.actions;

export const setUserWithPersistence =
  (user: UserState) => (dispatch: AppDispatch) => {
    dispatch(setUser(user));
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

export const logoutWithPersistence = () => (dispatch: AppDispatch) => {
  dispatch(logout());
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};

// Redux store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default authSlice.reducer;
