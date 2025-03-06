interface ProductVariant {
  variant_id: number;
  sku: string;
  color: string;
  size: string;
  available_in_stock: number;
  discount: number;
  product_price: number;
  offer_price: number;
}

export interface ProductData {
  product_id: number;
  product_name: string;
  product_description: string;
  brand: string;
  subcategory_id: number;
  product_variants: ProductVariant[];
  product_images: string[];
  is_wishlist: boolean;
}
export interface VendorData {
  id: number;
  business_name: string;
  city: string;
  state: string;
  pincode: number;
  profile_pic: string;
  rating: null | number;
}
[];

export interface CategoryData {
  category_id: number;
  category_name: string;
  category_image: string;
  created_by: number;
  created_on: string;
  modified_by: null | string;
  modified_on: null | string;
  created_by_name: string;
  modified_by_name: string;
}

export interface SubCategoryData {
  subcategory_id: number;
  subcategory_name: string;
  category_id: number;
  created_by: number;
  created_on: string;
  modified_by: null | string;
  modified_on: null | string;
  created_by_name: string;
  modified_by_name: string;
  subcategory_image: string;
}

export interface BannerData {
  area_postal_code: number;
  banner_id: number;
  banner_img_url: string;
  created_by: number;
  created_by_name: string;
  created_on: string;
  end_date: string;
  is_active: boolean;
  modified_by: null | string;
  modified_by_name: string;
  modified_on: null | string;
  start_date: string;
}

interface ProductImage {
  product_image: string;
}

interface ProductVariantDetails {
  variant_id: number;
  size: string;
  color: string;
  sku: string;
  product_price: string;
  discount: number;
  available_in_stock: number;
  images: ProductImage[];
}

interface VariantAvailable {
  available_in_stock: number;
  color: null | string;
  discount: number;
  product_price: number;
  size: string;
  sku: string;
  variant_id: number;
}

export interface ProductDetailsData {
  product_id: number;
  product_material: string;
  brand: string | null;
  care_instructions: string;
  is_wishlist: boolean;
  product_name: string;
  product_description: string;
  variant: ProductVariantDetails;
  product_variants: VariantAvailable[];
  sharable_link: string;
  subcategory_id: number;
}

export interface VideoBannerData {
  video_banner_id: number;
  video: string;
  is_active: boolean;
  created_by: number;
  created_at: string;
  updated_by: number | null;
  updated_at: string | null;
  created_by_name: string;
  modified_by_name: string;
}
//  offer banner
export interface OfferBanner {
  offer_banner_id: number;
  category_id: number;
  offer_title: string;
  offer_description: string;
  discount_percentage: string;
  offer_banner_image: string;
  start_date: string; // Use Date if parsing to a Date object is preferred.
  end_date: string; // Same as above
  created_by: number;
  created_on: string;
  modified_by: number | null;
  modified_on: string | null;
}

// Winter Collection
interface winterProductVariant {
  variant_id: number;
  sku: string;
  color: string | null;
  size: string;
  available_in_stock: number;
  discount: number;
  product_price: number;
}

export interface winterProduct {
  product_id: number;
  product_name: string;
  product_description: string;
  brand: string | null;
  subcategory_id: number;
  product_variants: winterProductVariant[];
  product_images: string[];
  is_wishlisted: boolean;
}

// women collection

interface womenProductVariant {
  variant_id: number;
  sku: string;
  color: string | null;
  size: string;
  available_in_stock: number;
  discount: number;
  product_price: number;
}

export interface womenProduct {
  product_id: number;
  product_name: string;
  product_description: string;
  brand: string | null;
  subcategory_id: number;
  product_variants: womenProductVariant[];
  product_images: string[]; // Array of image URLs
  is_wishlisted: boolean;
}

// men collection
interface menProductVariant {
  variant_id: number;
  sku: string;
  color: string | null;
  size: string;
  available_in_stock: number;
  discount: number;
  product_price: number;
}

export interface menProduct {
  product_id: number;
  product_name: string;
  product_description: string;
  brand: string | null;
  subcategory_id: number;
  product_variants: menProductVariant[];
  product_images: string[]; // Array of image URLs
  is_wishlisted: boolean;
}

export interface Image {
  product_image: string; // URL of the product image
  product_image_id: number; // Unique ID of the image
}

export interface Product {
  product_id: number; // Unique product ID
  product_name: string; // Name of the product
  product_description: string; // Description of the product
  product_material: string; // Material used for the product
  care_instructions: string; // Care instructions for the product
  brand: string | null; // Brand name or null if not available
  subcategory_id: number; // Subcategory ID the product belongs to
  created_by: string | null; // User who created the product or null
  created_on: string; // Creation date in ISO format
  modified_by: string | null; // User who last modified the product or null
  modified_on: string | null; // Modification date in ISO format or null
  search_tags: string[] | null; // Array of search tags or null
}

export interface SimilarVariants {
  variant_id: number; // Unique variant ID
  size: string; // Size of the variant
  product_id: number; // Related product ID
  color: string | null; // Color of the variant or null
  sku: string; // SKU (Stock Keeping Unit) code
  product_price: string; // Price of the product as a string
  discount: number; // Discount percentage
  available_in_stock: number; // Number of items available in stock
  images: Image[]; // Array of image objects
  product: Product;
}

interface ProductVariant {
  variant_id: number;
  sku: string;
  color: string | null;
  size: string;
  available_in_stock: number;
  discount: number;
  product_price: number;
}

export interface OfferProductData {
  product_id: number;
  product_name: string;
  product_description: string;
  brand: string | null;
  subcategory_id: number;
  product_variants: ProductVariant[];
  product_images: string[];
}
