import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';

const AddCart = createAsyncThunk(
  'customer/cart',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`cart/`, value);
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue(error.response);
      }
    }
  },
);

const GetCartList = createAsyncThunk(
  'customer/cart/get',
  async (_: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`cart/details/`);

      return data;
    } catch (error: any) {
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const UpdateVariantSize = createAsyncThunk(
  'customer/cart/get/size',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.patch(`cart/details/${value.cart_id}/`, {
        variant_id: value.variant_id,
      });

      return data;
    } catch (error: any) {
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const UpdateSizeDetails = createAsyncThunk(
  'customer/cart/get/size/details',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`products/details/${value}`, {
        params: {
          variant_id: value.variant_id,
        },
      });

      return data;
    } catch (error: any) {
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const RemoveCart = createAsyncThunk(
  'customer/cart/remove',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.delete(`cart/${value}/`);
      return data;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const updateCart = createAsyncThunk(
  'cart/update',
  async (value: any, {rejectWithValue, dispatch}) => {
    try {
      const {data} = await api.patch(
        `cart/quantity/${value?.product_cart_id}/`,
        {
          quantity: value?.quantity,
        },
      );

      dispatch(GetCartList(''));
      return data;
    } catch (error: any) {
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const ClearCart = createAsyncThunk(
  'customer/cart/remove',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.delete(`customer/cart/`);
      return data;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

// Order Create
const OrderCreate = createAsyncThunk(
  'customer/orderCreate',
  async (value: any, {rejectWithValue}) => {
    console.log(value);

    try {
      const {data} = await api.post(`order/create-order/`, value);

      return data;
    } catch (error: any) {
      console.log(144, error);

      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        console.log(149, error);

        return rejectWithValue(error.response);
      }
    }
  },
);

const OrderList = createAsyncThunk(
  'order/customer/',
  async (_: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`order/customer/`);

      return data;
    } catch (error: any) {
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const ReturnOrderList = createAsyncThunk(
  'order/retun_orders/',
  async (_: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`order/retun_orders/`);

      return data;
    } catch (error: any) {
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

// apply coupon
const ApplyCoupon = createAsyncThunk(
  'order/apply_coupon/',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`order/apply_coupon/`, value);

      return data;
    } catch (error: any) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.response);
      }
    }
  },
);

export {
  AddCart,
  GetCartList,
  RemoveCart,
  updateCart,
  OrderCreate,
  OrderList,
  UpdateVariantSize,
  UpdateSizeDetails,
  ApplyCoupon,
  ReturnOrderList,
};

export default {};
