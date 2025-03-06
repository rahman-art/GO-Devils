import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';

const clotheCategory = createAsyncThunk(
  'clothe/category',
  async (_: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`products/category/`);

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

const clotheSubCategory = createAsyncThunk(
  'clothe/subcategory',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(
        `https://go-devil-backend.iqsetters.com/products/category/subcategory/${value}/`,
      );

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

const ProductDetails = createAsyncThunk(
  'colthe/product/detils',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(
        `https://go-devil-backend.iqsetters.com/products/details/${value}/`,
      );
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

const SimilarProductDetails = createAsyncThunk(
  'colthe/product/detils/similar',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`products/subcategory/${value}/`);

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

const ProductList = createAsyncThunk(
  'clothe/list',
  async (value: any, {rejectWithValue}) => {
  

    try {
      const {data} = await api.get(
        `https://go-devil-backend.iqsetters.com/products/subcategory/${value.item}/?page_size=${value?.page_size}&page=${value?.page}`,
        {},
      );

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

const AllProductData = createAsyncThunk(
  'clothe/list/all',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(
        `https://go-devil-backend.iqsetters.com/products/collection/${value.item}/?page_size=${value?.page_size}&page=${value?.page}?search=${value}`,
        {
          params: {
            page_size: value?.page_size,
            page: value?.page,
          },
        },
      );

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

const FetchBanner = createAsyncThunk(
  'banner/',
  async (_: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`banner/`);
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
//  Banner Offer
const FetchOfferBanner = createAsyncThunk(
  'banner/offerBanner',
  async (_: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`banner/offer/`);
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

const OfferProduct = createAsyncThunk(
  'offer/product/detils',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(
        `products/offer_products/${value.item}/?page_size=${value?.page_size}&page=${value?.page}`,
      );
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

const FetchvideoBanner = createAsyncThunk(
  'video/banner/',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`banner/video/`);

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
const FetchNotifucation = createAsyncThunk(
  'customer/notification',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`notification/`);
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

// Winter collection
const WinterProductCollection = createAsyncThunk(
  'winter/collection',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`products/winter_collection/`, {
        params: {
          page_size: value?.page_size,
          page: value?.page,
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
// women collection
const WomenProductCollection = createAsyncThunk(
  'women/collection',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`products/women_collection/`);
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
const menProductCollection = createAsyncThunk(
  'men/collection',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`products/men_collection/`, {});
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
  clotheCategory,
  clotheSubCategory,
  ProductDetails,
  ProductList,
  FetchBanner,
  FetchvideoBanner,
  FetchNotifucation,
  menProductCollection,
  WomenProductCollection,
  WinterProductCollection,
  FetchOfferBanner,
  OfferProduct,
  AllProductData,
  SimilarProductDetails,
};

export default {};
