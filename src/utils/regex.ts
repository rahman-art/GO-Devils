const empty = (value: any) => {
  const val = value ? value.toString().trim() : value || value === 0;
  return !val;
};

const password = (value: string): boolean => {
  const rePass =
    /^(?=(.*\d){1})(?=.*[A-Z])(?=.*[a-z])(?=.*[#!@$^&*_-]).{7,16}$/;
  return !empty(value) && value.length >= 8 && rePass.test(value);
};

const alphabets = (value: string): boolean => {
  const reg = /^[a-zA-Z ]+$/;
  return !empty(value) && reg.test(value);
};

const number = (value: string): boolean => {
  const reg = /^[0-9]+$/;
  return !empty(value) && reg.test(value);
};

const email = (value: string): boolean => {
  const re =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

export {password, alphabets, number, email};

export default {};
