import {
  AddressInitialValueProp,
  DocumentInitialValueProp,
  RegisterInitialValueProp,
} from '../screens/auth/formik';

interface Customer {
  createdAt: string;
  created_by: number;
  email: string;
  firebase_device_token: string;
  full_name: string;
  id: number;
  profile_pic?: string;
  is_active: boolean;
  is_deleted: boolean;
  mobile_number: string;
  modified_by: number;
  role: string;
  updatedAt: string;
  customer_guid: string;
  working_status: false;
  branch: string;
  ifsc_code: string;
  bank_name: string;
  account_number: string;
  account_holder_name: string;
  pan_number: string;
  adhar_number: string;
  father_name: string;
  pincode: string;
  state: string;
  city: string;
  house_number: string;
  area: string;
  password_hash: string;
  adhar_front_image: string;
  adhar_back_image: string;
  pan_image: string;
}

export interface LoginResponseData {
  maali: Customer;
  token: string;
}

export type RegistrationInitialValueProp = {
  registerInitialValues: RegisterInitialValueProp;
  documentInitialValues: DocumentInitialValueProp;
  addressInitialValues: AddressInitialValueProp;
};
