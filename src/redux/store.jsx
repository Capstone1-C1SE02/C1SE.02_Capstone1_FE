import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import addReducer from "./addSlice"; // Assuming you still need these reducers
import deleteReducer from "./deleteSlice";
import editReducer from "./editSlice";
import searchSlice from "./searchSlice";
import {
  createMigrate,
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  addAction: addReducer,
  deleteAction: deleteReducer,
  editAction: editReducer,
  searchAction: searchSlice,
});

const persistedReducer = persistReducer(
  { key: "root", version: 1, storage },
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
