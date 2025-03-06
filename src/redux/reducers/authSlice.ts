import {createSlice} from '@reduxjs/toolkit';
import {
  customerRegister,
  ForgotPassword,
  userLogin,
  userLogout,
  userOtp,
} from '../actions/authAction';
import {
  LoginResponseData,
  RegistrationInitialValueProp,
} from '../../types/auth';

enum Status {
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

interface AuthState {
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
}

const initialState: AuthState = {
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

const authSlice = createSlice({
  name: 'auth',
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
    //login
    builder
      .addCase(userLogin.pending, state => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.loading = false;
        state.success = true;
        state.expired = false;
        state.userToken = action.payload.token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
      })

      // otp
      .addCase(userOtp.pending, state => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(userOtp.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.loading = false;
        state.success = true;
        state.expired = false;
        state.userToken = action.payload.jwt;
      })
      .addCase(userOtp.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(customerRegister.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(customerRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.userToken = action.payload.token;
        state.userInfo = action.payload.customer;
      })
      .addCase(customerRegister.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
      })

      // forgot
      .addCase(ForgotPassword.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(ForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        // state.userToken = action.payload.token;
        // state.userInfo = action.payload.customer;
      })
      .addCase(ForgotPassword.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
      })
      //  Logout
      .addCase(userLogout.pending, state => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.loading = false;
        state.success = true;
        state.expired = false;
        
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
      });
  },
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
} = authSlice.actions;

export default authSlice.reducer;
