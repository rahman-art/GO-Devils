import {createSlice} from '@reduxjs/toolkit';

import {
  AddCart,
  ApplyCoupon,
  GetCartList,
  OrderCreate,
  OrderList,
  RemoveCart,
  ReturnOrderList,
  updateCart,
  UpdateSizeDetails,
  UpdateVariantSize,
} from '../actions/cartAction';
import {CartState, DataOrder, ReturnResponse} from '../../types/cart';

enum Status {
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

interface AuthState {
  loading: boolean;
  couponLoading: boolean;
  cartLoading: boolean;
  error: null | any;
  success: null | boolean;
  created: boolean;
  status: null | string;
  message: string | null;
  totalPrice: number;
  totalDiscount: number;
  refresh: boolean;
  cartData: CartState[];
  total_price: number;
  total_discount: number;
  orderlistData: Array<DataOrder>;
  returnorderlistData: Array<ReturnResponse>;
  total: null | any;
  couponCode: null | string;
}

const initialState: AuthState = {
  loading: false,
  cartLoading: false,
  error: null,
  success: false,
  created: false,
  status: null,
  message: '',
  refresh: false,
  totalPrice: 0,
  totalDiscount: 0,
  cartData: [],
  total_price: 0,
  total_discount: 0,
  orderlistData: [],
  returnorderlistData: [],
  total: null,
  couponCode: null,
  couponLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
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
      .addCase(AddCart.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(AddCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.refresh = false;
      })
      .addCase(AddCart.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
        state.refresh = false;
      })

      //cart list
      .addCase(GetCartList.pending, state => {
        state.cartLoading = true;
        state.error = null;
        state.refresh = true;
      })
      .addCase(GetCartList.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.refresh = false;
        state.cartData = action.payload.cart_items;
        state.totalPrice = action.payload.total_price;
        state.totalDiscount = action.payload.total_discount;
      })
      .addCase(GetCartList.rejected, (state, action) => {
        state.cartLoading = false;
        state.refresh = false;
        state.error = action.payload || 'Something went wrong';
      })

      //cart list update
      .addCase(UpdateVariantSize.pending, state => {
        state.loading = true;
        state.error = null;
        state.refresh = true;
      })
      .addCase(UpdateVariantSize.fulfilled, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.cartData = action.payload.cart_items;
        state.totalPrice = action.payload.total_price;
        state.totalDiscount = action.payload.total_discount;
      })
      .addCase(UpdateVariantSize.rejected, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.error = action.payload || 'Something went wrong';
      })

      //cart list update
      .addCase(UpdateSizeDetails.pending, state => {
        state.loading = true;
        state.error = null;
        state.refresh = true;
      })
      .addCase(UpdateSizeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.cartData = action.payload.cart_items;
        state.totalPrice = action.payload.total_price;
        state.totalDiscount = action.payload.total_discount;
      })
      .addCase(UpdateSizeDetails.rejected, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.error = action.payload || 'Something went wrong';
      })

      //remove cart
      .addCase(RemoveCart.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(RemoveCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.refresh = false;
      })
      .addCase(RemoveCart.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
        state.refresh = false;
      })

      //update cart
      .addCase(updateCart.pending, state => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.loading = false;
        state.success = true;
        state.message = action.payload.msg;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
      })
      // Order Create
      .addCase(OrderCreate.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(OrderCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.refresh = false;
      })
      .addCase(OrderCreate.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
        state.refresh = false;
      })

      //order list
      .addCase(OrderList.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(OrderList.fulfilled, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.orderlistData = action.payload.orders;
        // state.total = action.payload.count;
      })
      .addCase(OrderList.rejected, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.error = action.payload || 'Something went wrong';
        state.message = '';
      })

      //order list return
      .addCase(ReturnOrderList.pending, state => {
        state.error = null;
        state.loading = true;
        state.refresh = true;
      })
      .addCase(ReturnOrderList.fulfilled, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.returnorderlistData = action.payload.data.results;
        // state.total = action.payload.count;
      })
      .addCase(ReturnOrderList.rejected, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.error = action.payload || 'Something went wrong';
        state.message = '';
      })

      //update cart
      .addCase(ApplyCoupon.pending, state => {
        state.status = Status.pending;
        state.error = null;
        state.couponLoading = true;
      })
      .addCase(ApplyCoupon.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.couponLoading = false;
        state.success = true;
        state.couponCode = action.payload.discount_amount;
      })
      .addCase(ApplyCoupon.rejected, (state, action) => {
        state.status = Status.failed;
        state.couponLoading = false;
        state.error = action.payload;
      });
  },
});

export const {updateSuccess, resetMessage, RefreshApi} = cartSlice.actions;

export default cartSlice.reducer;
