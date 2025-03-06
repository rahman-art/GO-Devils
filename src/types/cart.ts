interface ProductImage {
  product_image_id: number;
  product_id: number;
  product_image: string;
  created_by: number;
  created_on: string;
  modified_by: number | null;
  modified_on: string | null;
}

interface Product {
  product_id: number;
  product_name: string;
  product_description: string;
  product_material: string;
  care_instructions: string;
  brand: string | null;
  subcategory_id: number;
  created_by: number | null;
  created_on: string;
  modified_by: number | null;
  modified_on: string | null;
  search_tags: string | null;
}

interface Variant {
  variant_id: number;
  size: string;
  product_id: number;
  color: string | null;
  sku: string;
  product_price: string;
  discount: number;
  available_in_stock: number;
}

interface CartItem {
  product_cart_id: number;
  variant_id: number;
  quantity: number;
  wishlist_flag: boolean;
  created_by: number;
  created_on: string;
  modified_by: number | null;
  modified_on: string | null;
  images: ProductImage[];
  product: Product;
  variant: Variant;
  available_variant: Variant[];
  price: number;
  discount: number;
}

export interface CartState {
  cartData: CartItem[];
  total_price: number;
  total_discount: number;
  loading: boolean;
  error: string | null;
  refresh: boolean;
}

export interface Items {
  product_variant_id: number;
  product_name: string;
  quantity: number;
  price_at_purchase: number;
  images: string[];
}

export interface DataOrder {
  order_id: number;
  status: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
  shipping_address: string | null;
  payment_status: string;
  items: Items[];
  payment_method: string;
  expected_delivery_date: null | string;
  shiprocket_order_id: null | number;
  is_return: boolean;
}

export interface Data {
  order_item_id: number;
  product_name: string;
  product_image: string;
  variant_size: string;
  sku: string;
  offer_price: number;
  purchase_price: number;
}

export interface ReturnResponse {
  order_id: number;
  order_item_id: null | string;
  shiprocket_return_id: string;
  shiprocket_return_shipment_id: string;
  return_reason: string;
  return_status: string;
  shiprocket_return_status_code: number;
  refund_amount: null | string;
  refund_mode: null | string;
  refund_coupon_code: null | string;
  return_requested_at: string;
  return_processed_at: null | string;
  metadata: null | string;
  products: Data[];
}
