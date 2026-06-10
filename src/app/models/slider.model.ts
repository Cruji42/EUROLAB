export interface BannerSlide {
  id: number;
  sort_order: number;
  is_active: boolean;
  subtitle: string;
  title: string;
  description: string;
  image_url: string;
  btn_primary_text: string;
  btn_primary_link: string;
  btn_secondary_text: string;
  btn_secondary_link: string;
}

export type BannerSlidePayload = Omit<BannerSlide, 'id'>;
