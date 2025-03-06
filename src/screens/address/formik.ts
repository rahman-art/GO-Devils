import * as Yup from 'yup';

/**
 *
 * address Validation data
 *
 */

export interface AddressInitialValueProp {
  full_name: string;
  phone_primary: number | null;
  pin_code: string;
  city: string;
  state: string;
  address_line_1: string;
  land_mark: string;
  address_type: string;
  country: string;
}

const addressInitialValues: AddressInitialValueProp = {
  full_name: '',
  phone_primary: null,
  pin_code: '',
  state: '',
  city: '',
  address_line_1: '',
  country: '',
  address_type: '',
  land_mark: '',
};

const addressInitialValidation = Yup.object().shape({
  full_name: Yup.string()
    .required('Full name is required')
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain alphabets and spaces'),
  phone_primary: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number can only contain numbers') // Regex for digits only
    .required('Phone Number is required')
    .min(10, 'Phone number must be exactly 10 digits')
    .max(10, 'Phone number must be exactly 10 digits'),
  pin_code: Yup.string()
    .matches(/^[0-9]+$/, 'Pincode can only contain numbers') // Regex for digits only
    .required('Pincode is required')
    .min(6, 'Pincode must be exactly 6 digits')
    .max(6, 'Pincode must be exactly 6 digits'),
  state: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'State can only contain alphabets and spaces') // Regex for alphabets and spaces
    .required('State is required'),
  city: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'City can only contain alphabets and spaces') // Regex for alphabets and spaces
    .required('City is required'),
  address_line_1: Yup.string().required('Address  is required'),
  country: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Country can only contain alphabets and spaces')
    .required('Country is required'),
  address_type: Yup.string()
    .required('Please select the type of address')
    .oneOf(['home', 'office'], 'Invalid address type'),
  land_mark: Yup.string().required('Area is required'),
});

/**
 *
 * Document upload data
 *
 */

export {addressInitialValidation, addressInitialValues};
