export interface RatingReview {
  rating_id: number;
  user_id: number;
  variant_id: number;
  rating_value: number;
  rating_title: string;
  review_text: string;
  review_status: string;
  created_on: string;
}
