import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import api from '../../api';

const AddWishList = createAsyncThunk(
  'customer/wishlist',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`wishlist/`, value);
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

const GetWishList = createAsyncThunk(
  'customer/wishlist/get',
  async (_: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`wishlist/`);
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

const RemoveWishList = createAsyncThunk(
  'remove/wishlist',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.delete(`/customer/wishlist/${value}`);

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

const TrackOrder = createAsyncThunk(
  'customer/wishlist/get/track',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`order/tracking/${value}/`);

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

const OrderDetailsData = createAsyncThunk(
  'customer/wishlist/get/track/order',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`order/items/${value}/`);

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

const ReturnProduct = createAsyncThunk(
  'customer/return',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`order/order_return/`, value);
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
  AddWishList,
  GetWishList,
  RemoveWishList,
  TrackOrder,
  OrderDetailsData,
  ReturnProduct,
};

export default {};
