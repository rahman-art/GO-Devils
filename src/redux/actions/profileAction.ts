import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import api from '../../api';

const updateUser = createAsyncThunk(
  'user/update',
  async (value: any, {rejectWithValue, dispatch}) => {
    try {
      const {data} = await api.patch(`customer/me`, value);

      dispatch(getProfile(''));
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

const getProfile = createAsyncThunk(
  'get/profile',
  async (_: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`auth/users/`);
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


const deleteAccount = createAsyncThunk(
  'user/delete',
  async (value: any, {rejectWithValue, dispatch}) => {
    try {
      const {data} = await api.patch(`auth/customer/delete/`,{}, value);

     
      
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
export {updateUser, getProfile,deleteAccount};

export default {};