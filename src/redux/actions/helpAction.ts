import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api';

const helpsAction = createAsyncThunk(
  'chat/queries',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`queries/`, value);


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
// all queries
const allqueriesAction = createAsyncThunk(
  'queries',
  async (value: { startIndex: number; endIndex: number }, { rejectWithValue }) => {
    const { startIndex, endIndex } = value; 
    try {
      const { data } = await api.get(
        `queries/paginated/?startIndex=${startIndex}&endIndex=${endIndex}`
      );
      return data;
    } catch (error: any) {
      console.error('Error fetching queries:', error.response?.data);

      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  }
);

// add reply queries

const replyAddAction = createAsyncThunk(
  'reply/queries',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`queries/message/`, value);


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

// reply message queries
const addMessageQueries = createAsyncThunk(
  'allmeaage/queries',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`queries/message/list/${value}/`);


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
export {helpsAction, allqueriesAction,
  replyAddAction,addMessageQueries
};

export default {};
