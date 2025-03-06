export interface ProfileData {
  id: number;
  last_login: null |string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  address: string;
  email: string;
  phone_number: null |string;
  age: string;
  gender: null |string;
  created_by: null |string;
  created_on: string;
  modified_by: null |string;
  modified_at: string;
  is_active: true;
  role: number;
}
