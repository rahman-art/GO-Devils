import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import cartReducer from './reducers/cartSlice';
import authReducer from './reducers/authSlice';
import userReducer from './reducers/userSlice';
import profileReducer from './reducers/profileSlice'
import addressReducer from './reducers/addressSlice';
import homeReducer from './reducers/homeSlice';
import helpReducer from './reducers/helpSlice';
import refreshReducer from './refreshSlice'
import reviewsReducer from './reducers/reviewsSlice';
const rootReducer = combineReducers({
  // Add your reducers here
  auth: authReducer,
  user: userReducer,
  cart: cartReducer,
  profile: profileReducer,
  address: addressReducer,
  home: homeReducer,
  help:helpReducer,
  refresh:refreshReducer,
  reviews:reviewsReducer
  
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Add the reducer keys you want to persist here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
