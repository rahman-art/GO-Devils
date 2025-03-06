import {createSlice} from '@reduxjs/toolkit';
// const MylocalData =async()=>{
//     const myLocalData = await AsyncStorage.getItem('listData')
// return JSON.parse(myLocalData)
// }

const refreshSlice = createSlice({
  name: 'refresh',
  initialState: {
    refresh: false,

    productDetailsId: '',

    wishlistCount: [],
  },
  reducers: {
    setWishlistCount: (state, action) => {
      state.wishlistCount = action.payload;
    },

    setProductDetailsId: (state, action) => {
      state.productDetailsId = action.payload;
    },

    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
  },
});

export const {setRefresh, setProductDetailsId, setWishlistCount} =
  refreshSlice.actions;
export default refreshSlice.reducer;
