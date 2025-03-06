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
  addressData: Array<AddressDetails>;
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
  addressData: [],
  refresh: false,
  totalPrice: [],
  primaryAddressData: null,
};

const addressSlice = createSlice({
  name: 'address',
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

      //add cart
      .addCase(AddAddress.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(AddAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.refresh = false;
      })
      .addCase(AddAddress.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
        state.refresh = false;
      })

      //cart list
      .addCase(GetAddress.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(GetAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.addressData = action.payload.address;
      })
      .addCase(GetAddress.rejected, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.error = action.payload;
        state.message = '';
      })

      //remove cart
      .addCase(RemoveAddress.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(RemoveAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.refresh = false;
      })
      .addCase(RemoveAddress.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
        state.refresh = false;
      })

      //update cart
      .addCase(UpdateAddress.pending, state => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(UpdateAddress.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.loading = false;
        state.success = true;
        state.message = action.payload.msg;
      })
      .addCase(UpdateAddress.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
      })

      //add cart
      .addCase(makePrimaryAddress.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(makePrimaryAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.refresh = false;
      })
      .addCase(makePrimaryAddress.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
        state.refresh = false;
      })

      //cart list
      .addCase(GetPrimaryAddress.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(GetPrimaryAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.primaryAddressData = action.payload.address;
      })
      .addCase(GetPrimaryAddress.rejected, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.error = action.payload;
        state.message = '';
      });
  },
});

export const {updateSuccess, resetMessage, RefreshApi} = addressSlice.actions;

export default addressSlice.reducer;