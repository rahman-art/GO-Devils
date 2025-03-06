export interface AddressDetails {
  address_id: number;
  customer_id: number;
  full_name: string;
  address_type: string;
  phone_primary: string;
  phone_secondary: null | string;
  address_line_1: string;
  address_line_2: null | string;
  city: string ;
  state: string;
  country: string;
  pin_code: string;
  land_mark: string;
  is_primary: boolean;
}
[];

export interface PrimaryAddressDetails {
  address_type: string;
  area: string;
  city: string;
  createdAt: string;
  customer_id: number;
  full_name: string;
  house_number: string;
  id: number;
  is_primary: boolean;
  mobile_number: number;
  pincode: number;
  state: string;
  updatedAt: string;
}
