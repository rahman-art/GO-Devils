import {createSlice} from '@reduxjs/toolkit';
import {
  AddWishList,
  GetWishList,
  OrderDetailsData,
  RemoveWishList,
  ReturnProduct,
  TrackOrder,
} from '../actions/userAction';
import {ProductData} from '../../types/home';
import {OrderFtech, ShipmentTrack, WishlistData} from '../../types/user';
import {NotificationData} from '../../types/notification';

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
  wishList: Array<WishlistData>;
  refresh: boolean;
  trackorderdata: Array<ShipmentTrack>;
  orderData: Array<OrderFtech>;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  created: false,
  status: null,
  message: '',
  wishList: [],
  refresh: false,
  trackorderdata: [],
  orderData: [],
};

const userSlice = createSlice({
  name: 'user',
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

      .addCase(AddWishList.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(AddWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.refresh = false;
      })
      .addCase(AddWishList.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
        state.refresh = false;
      })

      //wish list
      .addCase(GetWishList.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(GetWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.wishList = action.payload.data;
      })
      .addCase(GetWishList.rejected, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.error = action.payload;
        state.message = '';
      })

      .addCase(TrackOrder.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(TrackOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.trackorderdata = action.payload;
      })
      .addCase(TrackOrder.rejected, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.error = action.payload || 'An error occurred';

        state.message = action.error?.message || '';
      })

      .addCase(RemoveWishList.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(RemoveWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.refresh = false;
      })
      .addCase(RemoveWishList.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
        state.refresh = false;
      })

      .addCase(OrderDetailsData.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(OrderDetailsData.fulfilled, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.orderData = action.payload;
      })
      .addCase(OrderDetailsData.rejected, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.error = action.payload;
        state.message = '';
      })

      .addCase(ReturnProduct.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(ReturnProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.refresh = false;
      })
      .addCase(ReturnProduct.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
        state.refresh = false;
      });
  },
});

export const {updateSuccess, resetMessage, RefreshApi} = userSlice.actions;

export default userSlice.reducer;
