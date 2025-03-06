import {createSlice} from '@reduxjs/toolkit';
import {CartData, CartItem} from '../../types/cart';
import {
  AddAddress,
  GetAddress,
  GetPrimaryAddress,
  makePrimaryAddress,
  RemoveAddress,
  UpdateAddress,
} from '../actions/addressAction';
import {AddressDetails, PrimaryAddressDetails} from '../../types/address';
import {AddReview, AddReviews, GetReviews} from '../actions/reatingAction';
import {RatingReview} from '../../types/reviews';

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
  reviewsData: Array<RatingReview>;
  refresh: boolean;
  totalPrice: CartItem[];
  primaryAddressData: null | PrimaryAddressDetails;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  created: false,
  status: null,
  message: '',
  reviewsData: [],
  refresh: false,
  totalPrice: [],
  primaryAddressData: null,
};

const addressSlice = createSlice({
  name: 'reviews',
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

      //add Reviews
      .addCase(AddReview.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(AddReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.refresh = false;
      })
      .addCase(AddReview.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
        state.refresh = false;
      })

      //cart list
      .addCase(GetReviews.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(GetReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.reviewsData = action.payload.data;
      })
      .addCase(GetReviews.rejected, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.error = action.payload;
        state.message = '';
      });
  },
});

export const {updateSuccess, resetMessage, RefreshApi} = addressSlice.actions;

export default addressSlice.reducer;
