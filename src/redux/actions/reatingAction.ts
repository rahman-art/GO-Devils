import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api';

const AddReview = createAsyncThunk(
  'product/review',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`reviews/`, value);

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

const GetReviews = createAsyncThunk(
  'review/get',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`reviews/${value}/`);
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

export {AddReview, GetReviews};

export default {};
