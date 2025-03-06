interface ProductDetails {
  variant_id: number;
  size: string;
  product_id: number;
  color: string | null;
  sku: string;
  product_price: string;
  discount: number;
  available_in_stock: number;
}

export interface WishlistData {
  wishlist_id: number;
  variant_id: number;
  quantity: number;
  product_name: string;
  created_by: number;
  created_on: string;
  modified_by: number | null;
  modified_on: string | null;
  product_details: ProductDetails;
  image_urls: string[];
  product_id: number;
}

export interface ShipmentTrack {
  id: number;
  awb_code: string;
  courier_company_id: number | null;
  shipment_id: number;
  order_id: number;
  pickup_date: string;
  delivered_date: string;
  weight: string;
  packages: number;
  current_status: string;
  delivered_to: string;
  destination: string;
  consignee_name: string;
  origin: string;
  courier_agent_details: any | null;
  courier_name: string;
  edd: string | null;
  pod: string;
  pod_status: string;
  rto_delivered_date: string;
  return_awb_code: string;
}

export interface TrackingData {
  track_status: number;
  shipment_status: number;
  shipment_track: ShipmentTrack[];
  shipment_track_activities: any | null;
  track_url: string;
  qc_response: string;
  is_return: boolean;
  error: string;
}

export interface OrderFtech {
  product_variant_id: number;
  quantity: number;
  price_at_purchase: number;
  product_image_url: string;
}
