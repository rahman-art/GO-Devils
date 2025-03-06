import {createSlice} from '@reduxjs/toolkit';
import {
  customerRegister,
  ForgotPassword,
  userLogin,
  userOtp,
} from '../actions/authAction';
import {
  LoginResponseData,
  RegistrationInitialValueProp,
} from '../../types/auth';
import {  
  addMessageQueries,
  // addMessageQueries, 
  allqueriesAction, helpsAction,
  replyAddAction, 
  // replyAddAction 
} from '../actions/helpAction';
import { helpData, queriesMessageData } from '../../types/help';


enum Status {
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

interface helpState {
  loading: boolean;
  userToken: null | string;
  userInfo: null | LoginResponseData;
  error: null | any;
  success: null | Object;
  status: null | string;
  registerSuccess: boolean;
  mobileVerified: boolean;
  message: string | null;
  expired: boolean;
  withoutRegister: boolean;
  isFirstOpen: boolean;
  registrationStepValues: RegistrationInitialValueProp;
  total:null |any;
  queryData:Array<helpData>
  allQueriesData:Array<helpData>
  replyMessageData:Array<queriesMessageData>
}

const initialState: helpState = {
  loading: false,
  userToken: null, // for storing the JWT
  userInfo: null, // for user object
  error: null,
  success: false, // for monitoring the registration process.
  status: null,
  registerSuccess: false,
  mobileVerified: false,
  message: '',
  expired: false,
  withoutRegister: false,
  isFirstOpen: false,
  total:null,
  queryData:[],
  allQueriesData:[],
  replyMessageData:[],
  registrationStepValues: {
    registerInitialValues: {
      full_name: 'sss',
      dob: '',
      mobile_number: '7827487611',
      email: 'test@yopmail.com',
      password: '11223344',
      confirmPassword: '11223344',
    },
    documentInitialValues: {
      adhar_number: '',
      liecence: '',
      profile: {
        uri: '',
        type: '',
        name: '',
      },
      adhar_front: {
        uri: '',
        type: '',
        name: '',
      },
      adhar_back: {
        uri: '',
        type: '',
        name: '',
      },
      liecence_card: {
        uri: '',
        type: '',
        name: '',
      },
    },
    addressInitialValues: {
      area: '',
      city: '',
      vehicleNumber: '',
      vehicleType: '',
    },
  },
};

const helpSlice = createSlice({
  name: 'help',
  initialState,
  reducers: {
    updateExpire: state => {
      state.expired = true;
    },
    loginValue: state => {
      state.error = '';
      state.loading = false;
    },
    updateWithoutRegister: state => {
      state.withoutRegister = true;
    },
    resetFirst: state => {
      state.isFirstOpen = false;
    },
    logout: state => {
      state.userToken = null;
    },
    completeRegister: state => {
      state.registerSuccess = true;
    },
    removeRegister: state => {
      state.registerSuccess = false;
    },
    resetSuccess: state => {
      state.success = false;
    },
    resetVerified: state => {
      state.mobileVerified = false;
    },
    phoneVerified: state => {
      state.mobileVerified = true;
    },
    resetMessage: state => {
      state.message = '';
    },
    updateUserInfo: (state, action) => {},
    updateRegistrationStepValue: (state, {payload}) => {
      state.registrationStepValues = payload;
    },
  },
  extraReducers: builder => {
    //Help
    builder
      .addCase(helpsAction.pending, state => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(helpsAction.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.loading = false;
        state.success = true;
        state.expired = false;
      
      })
      .addCase(helpsAction.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
      })

      // all queries
      .addCase(allqueriesAction.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(allqueriesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.allQueriesData = action.payload.querys;
        state.total = action.payload.total_record_count;
      })
      .addCase(allqueriesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = '';
      })


    // message queries
    .addCase(addMessageQueries.pending, state => {
      state.error = null;
      state.loading = true;
    })
    .addCase(addMessageQueries.fulfilled, (state, action) => {
      state.loading = false;
      state.replyMessageData = action.payload.query_reply;
    })
    .addCase(addMessageQueries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = '';
    })

    // add messgae all
    .addCase(replyAddAction.pending, state => {
      // state.status = Status.pending;
      state.error = null;
      state.loading = true;
    })
    .addCase(replyAddAction.fulfilled, (state, action) => {
      state.status = Status.succeeded;
      state.loading = false;
      state.success = true;
      state.expired = false;
    
    })
    .addCase(replyAddAction.rejected, (state, action) => {
      state.status = Status.failed;
      state.loading = false;
      state.error = action.payload;
    })
  }

    
});

export const {
  loginValue,
  logout,
  completeRegister,
  removeRegister,
  resetSuccess,
  resetVerified,
  phoneVerified,
  resetMessage,
  updateExpire,
  updateUserInfo,
  updateWithoutRegister,
  resetFirst,
  updateRegistrationStepValue,
} = helpSlice.actions;

export default helpSlice.reducer;
