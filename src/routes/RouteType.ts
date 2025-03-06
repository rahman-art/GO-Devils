import type {StackScreenProps} from '@react-navigation/stack';

export type AuthScreenParamList = {
  SplashScreen: undefined;
  LoginType: undefined;
  EmailLogin: undefined;
  PhoneLogin: undefined;
  ResetPassword: undefined;
  DrawerNavigator: undefined;
  BottomNavigator: undefined;
  Notification: undefined;
  OrderReview: undefined;
  Cart: undefined;
  ProductDetails: undefined;
  Similarproduct: undefined;
  Reviews: undefined;
  AddRatings: undefined;
  Otp: undefined;
  Products: undefined;
  EditProfile: undefined;
  AddNewAddress: undefined;
  EditAddress: undefined;
  SaveAddress: undefined;
  Drop: undefined;
  OrderTrack: undefined;
  LikeThings: undefined;
  AllLikeThings: undefined;
  ImageSilder: undefined;
  Category: undefined;
  SubCategory: undefined;
  HelpSupport: undefined;
  ChatCard: undefined;
  Help: undefined;
  HelpNext: undefined;
  MenCollectionProduct: undefined;
  WinterCollection: undefined;
  WomenCollection: undefined;
  RatingReview: undefined;
  OfferBanner: undefined;
  AllOfferBanner: undefined;
  PaymentScreen: undefined;
  OrderList: undefined;
  TermsOfServices: undefined;
  Retruns: undefined;
  ShippingPolicy: undefined;
  HomeScreen: undefined;
  HomeScreen1: undefined;
  Drop1: undefined;
  Category1: undefined;
  AllOfferBanner1: undefined;
  ProductDetail1: undefined;
  WinterCollection1: undefined;
  Products1: undefined;
  SubCategory1: undefined;
  AddReviews: undefined;
  ReturnScreen: undefined;
  ReturnList: undefined;
  ReturnComplete: undefined;
};

export type RootStackParamList = {};

export type BottomParamList = {
  Menu: undefined;
  HomeScreen: undefined;
  Order: undefined;
  Notification: undefined;
  Search: undefined;
};

export type ServiceParamList = {
  Bag: undefined;
  WishList: undefined;
};

export type OrderParamList = {
  All: undefined;
  Incoming: undefined;
  Outgoing: undefined;
  Missed: undefined;
  Rejected: undefined;
};

export type DrawerNavigatorParamList = {
  BottomNavigator: undefined;
  Notification: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
  HomeScreen: undefined;
  OurPackage: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
