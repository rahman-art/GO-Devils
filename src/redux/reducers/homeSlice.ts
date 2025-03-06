import {createSlice} from '@reduxjs/toolkit';
import {
  FetchBanner,
  clotheCategory,
  ProductDetails,
  ProductList,
  clotheSubCategory,
  FetchvideoBanner,
  FetchNotifucation,
  menProductCollection,
  WomenProductCollection,
  WinterProductCollection,
  FetchOfferBanner,
  OfferProduct,
  AllProductData,
  SimilarProductDetails,
} from '../actions/homeAction';
import {
  BannerData,
  CategoryData,
  menProduct,
  OfferBanner,
  OfferProductData,
  ProductData,
  ProductDetailsData,
  SimilarVariants,
  SubCategoryData,
  VendorData,
  VideoBannerData,
  winterProduct,
  womenProduct,
} from '../../types/home';
import {NotificationData} from '../../types/notification';

interface AuthState {
  loading: boolean;
  dataloading: boolean;
  offerLoading: boolean;
  categoryLoading: boolean;
  similarLoading: boolean;
  error: null | any;
  success: null | boolean;
  created: boolean;
  status: null | string;
  message: string | null;
  cloth: Array<CategoryData>;
  subcategory: Array<SubCategoryData>;
  productDetailsData: null | ProductDetailsData;
  winterProducts: Array<ProductData>;
  womenProducts: Array<ProductData>;
  mensProducts: Array<ProductData>;
  products: Array<ProductData>;
  vendor: Array<VendorData>;
  banner: Array<BannerData>;
  offerBanner: Array<OfferBanner>;
  videoBanner: Array<VideoBannerData>;
  notification: Array<NotificationData>;
  similar: Array<ProductData>;
  offerData: Array<ProductData>;
  total: null | any;
  nextPage: null | string;
  prevPage: null | string;
  allproducts: Array<ProductData>;
}

const initialState: AuthState = {
  loading: false,
  dataloading: false,
  offerLoading: false,
  categoryLoading: false,
  similarLoading: false,
  error: null,
  success: false,
  created: false,
  status: null,
  message: '',
  cloth: [],
  subcategory: [],
  productDetailsData: null,
  products: [],
  winterProducts: [],
  womenProducts: [],
  mensProducts: [],
  vendor: [],
  banner: [],
  offerBanner: [],
  videoBanner: [],
  notification: [],
  similar: [],
  offerData: [],
  total: null,
  allproducts: [],
  nextPage: null,
  prevPage: null,
};

const homeSlice = createSlice({
  name: 'home',
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
  },
  extraReducers: builder => {
    //login
    builder

      //plant-category
      .addCase(clotheCategory.pending, state => {
        state.error = null;
        state.categoryLoading = true;
      })
      .addCase(clotheCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.cloth = action.payload;
      })
      .addCase(clotheCategory.rejected, (state, action) => {
        state.categoryLoading = false;
        state.error = action.payload;
        state.message = '';
      })

      //clothe sub-category
      .addCase(clotheSubCategory.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(clotheSubCategory.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.subcategory = payload.data;
      })
      .addCase(clotheSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //plant list
      .addCase(ProductList.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(ProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.results;
        state.total = action.payload.count;
        state.nextPage = action.payload.next;
        state.prevPage = action.payload.previous;
      })
      .addCase(ProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = '';
      })

      //plant list
      .addCase(AllProductData.pending, state => {
        state.error = null;
        state.dataloading = true;
      })
      .addCase(AllProductData.fulfilled, (state, action) => {
        state.dataloading = false;
        state.allproducts = action.payload.results;
        state.total = action.payload.count;
        state.nextPage = action.payload.next;
        state.prevPage = action.payload.previous;
      })
      .addCase(AllProductData.rejected, (state, action) => {
        state.dataloading = false;
        state.error = action.payload;
        state.message = '';
      })

      //plant details
      .addCase(ProductDetails.pending, state => {
        state.error = null;
        state.categoryLoading = true;
      })
      .addCase(ProductDetails.fulfilled, (state, action) => {
        state.productDetailsData = action.payload.product;
        state.categoryLoading = false;

        // state.similar = action.payload.product.similar_variants;
      })
      .addCase(ProductDetails.rejected, (state, action) => {
        state.categoryLoading = false;
        state.error = action.payload;
        state.message = '';
      })

      //plant details
      .addCase(SimilarProductDetails.pending, state => {
        state.error = null;
        state.similarLoading = true;
      })
      .addCase(SimilarProductDetails.fulfilled, (state, action) => {
        state.similarLoading = false;
        state.similar = action.payload.results;
      })
      .addCase(SimilarProductDetails.rejected, (state, action) => {
        state.similarLoading = false;
        state.error = action.payload;
        state.message = '';
      })

      //banner details
      .addCase(FetchBanner.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(FetchBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banner = action.payload;
      })
      .addCase(FetchBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = '';
      })

      // Offer Banner
      .addCase(FetchOfferBanner.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(FetchOfferBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.offerBanner = action.payload.data;
      })
      .addCase(FetchOfferBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = '';
      })

      // Offer Banner
      .addCase(OfferProduct.pending, state => {
        state.error = null;
        state.offerLoading = true;
      })
      .addCase(OfferProduct.fulfilled, (state, action) => {
        state.offerLoading = false;
        state.offerData = action.payload.results;
        state.total = action.payload.count;
        state.nextPage = action.payload.next;
        state.prevPage = action.payload.previous;
      })
      .addCase(OfferProduct.rejected, (state, action) => {
        state.offerLoading = false;
        state.error = action.payload;
        state.message = '';
      })

      // Video Banner
      .addCase(FetchvideoBanner.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(FetchvideoBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.videoBanner = action.payload;
      })
      .addCase(FetchvideoBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = '';
      })

      // Notification
      .addCase(FetchNotifucation.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(FetchNotifucation.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = action.payload;
      })
      .addCase(FetchNotifucation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = '';
      })
      // winter collection
      .addCase(WinterProductCollection.pending, state => {
        state.error = null;
        state.categoryLoading = true;
      })
      .addCase(WinterProductCollection.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.winterProducts = action.payload.results;
        state.total = action.payload.count;
      })
      .addCase(WinterProductCollection.rejected, (state, action) => {
        state.categoryLoading = false;
        state.error = action.payload;
        state.message = '';
      })
      // women collection
      .addCase(WomenProductCollection.pending, state => {
        state.error = null;
        state.categoryLoading = true;
      })
      .addCase(WomenProductCollection.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.womenProducts = action.payload;
      })
      .addCase(WomenProductCollection.rejected, (state, action) => {
        state.categoryLoading = false;
        state.error = action.payload;
        state.message = '';
      })
      // men collection
      .addCase(menProductCollection.pending, state => {
        state.error = null;
        state.categoryLoading = true;
      })
      .addCase(menProductCollection.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.mensProducts = action.payload;
      })
      .addCase(menProductCollection.rejected, (state, action) => {
        state.categoryLoading = false;
        state.error = action.payload;
        state.message = '';
      });
  },
});

export const {updateSuccess, resetMessage} = homeSlice.actions;

export default homeSlice.reducer;
