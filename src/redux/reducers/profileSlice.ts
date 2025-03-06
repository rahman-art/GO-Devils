import {createSlice} from '@reduxjs/toolkit';
import {deleteAccount, getProfile, updateUser} from '../actions/profileAction';
import {ProfileData} from '../../types/profile';

enum Status {
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

interface AuthState {
  loading: boolean;
  error: null | any;
  success: null | boolean;
  created: boolean;
  status: null | string;
  message: string | null;
  profileInfo: null | ProfileData;
  refresh: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  created: false,
  status: null,
  message: '',
  profileInfo: null,
  refresh: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateSuccess: state => {
      state.success = false;
      state.error = '';

      state.created = false;
    },
    resetMessage: state => {
      state.message = '';
    },
    RefreshApi: state => {
      state.refresh = false;
    },
  },
  extraReducers: builder => {
    //login
    builder
      .addCase(updateUser.pending, state => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.loading = false;
        state.success = true;
        state.message = action.payload.msg;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
      })
      // get Profile
      .addCase(getProfile.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileInfo = action.payload.profile;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = '';
      })

      //delete account
      .addCase(deleteAccount.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.refresh = false;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
        state.refresh = false;
      });
  },
});

export const {updateSuccess, resetMessage} = profileSlice.actions;

export default profileSlice.reducer;
