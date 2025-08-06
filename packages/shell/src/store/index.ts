import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  currentApp: string;
  user: {
    id?: string;
    name?: string;
    email?: string;
  };
  settings: {
    theme: 'light' | 'dark';
    language: 'zh-CN' | 'en-US';
  };
}

const initialState: GlobalState = {
  currentApp: 'home',
  user: {},
  settings: {
    theme: 'light',
    language: 'zh-CN',
  },
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCurrentApp: (state, action: PayloadAction<string>) => {
      state.currentApp = action.payload;
    },
    setUser: (state, action: PayloadAction<{ id?: string; name?: string; email?: string }>) => {
      state.user = { ...state.user, ...action.payload };
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.settings.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<'zh-CN' | 'en-US'>) => {
      state.settings.language = action.payload;
    },
    // 这个action是给qiankun子应用更新全局状态用的
    SET_GLOBAL_STATE: (state, action: PayloadAction<any>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setCurrentApp, setUser, setTheme, setLanguage } = globalSlice.actions;

export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['SET_GLOBAL_STATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 