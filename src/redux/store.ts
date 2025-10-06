import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import membersReducer from './slices/membersSlice';
import roleReducer from './slices/roleSlice';
import themeReducer from './slices/themeSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['members', 'role', 'theme'],
};

const persistedMembersReducer = persistReducer(
  { ...persistConfig, key: 'members' },
  membersReducer
);
const persistedRoleReducer = persistReducer(
  { ...persistConfig, key: 'role' },
  roleReducer
);
const persistedThemeReducer = persistReducer(
  { ...persistConfig, key: 'theme' },
  themeReducer
);

export const store = configureStore({
  reducer: {
    members: persistedMembersReducer,
    role: persistedRoleReducer,
    theme: persistedThemeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
