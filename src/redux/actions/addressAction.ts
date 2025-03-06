import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api';

const AddAddress = createAsyncThunk(
  'add/customer/address',
  async (value: any, {rejectWithValue}) => {
    

    try {
      const {data} = await api.post(`address/`, value);

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

const GetAddress = createAsyncThunk(
  'customer/address/get',
  async (_: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`address/`);

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

const RemoveAddress = createAsyncThunk(
  'customer/remove',
  async (value: any, {rejectWithValue}) => {
    

    try {
      const {data} = await api.delete(`address/delete/${value}/`);

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

const UpdateAddress = createAsyncThunk(
  'cart/update',
  async (value: any, {rejectWithValue, dispatch}) => {
    try {
      const {data} = await api.patch(`address/update/${value.address_id}`);
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

const makePrimaryAddress = createAsyncThunk(
  'address/primary',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.patch(`address/selected/${value.address_id}/`);

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

const GetPrimaryAddress = createAsyncThunk(
  'customer/address/get/primary',
  async (_: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`customer/address/primary`);

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

export {
  AddAddress,
  GetAddress,
  RemoveAddress,
  UpdateAddress,
  makePrimaryAddress,
  GetPrimaryAddress,
};

export default {};
