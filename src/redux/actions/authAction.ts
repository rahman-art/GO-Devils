import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api';

const userLogin = createAsyncThunk(
  'auth/login',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`auth/customer/login/`, value);
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

const userOtp = createAsyncThunk(
  'auth/otp',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`auth/customer/login/`, value);
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
const customerRegister = createAsyncThunk(
  'auth/register',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`maali/auth/register`, value, {
        headers: {
          'Content-Type': 'multipart/form-data',
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

const ForgotPassword = createAsyncThunk(
  'maali/auth/forgot',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`maali/auth/forgot`, value);

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

const userLogout = createAsyncThunk(
  'auth/logout',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`auth/users/logout/`, value);
  
   
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

export {userLogin, customerRegister, ForgotPassword,userOtp,userLogout};

export default {};
