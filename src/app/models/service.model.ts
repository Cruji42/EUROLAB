export interface ServiceCard {
  id: number;
  slug: string;
  name: string;
  card_hover_text: string | null;
  card_icon_url: string | null;
  sort_order: number;
}

export interface ServiceCheck {
  id: number;
  label: string;
  sort_order: number;
}

export interface ServiceFAQ {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
}

export interface ServiceDetail {
  id: number;
  slug: string;
  name: string;
  breadcrumb: string | null;
  hero_image_url: string | null;
  body_p1: string;
  body_p2: string;
  sub_title: string | null;
  sub_paragraph: string | null;
  info_title: string | null;
  info_paragraph: string | null;
  desc_title: string | null;
  desc_paragraph: string | null;
  detail_title: string | null;
  detail_paragraph: string | null;
  card_hover_text: string | null;
  card_icon_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_active: boolean;
  sort_order: number;
  checks: ServiceCheck[];
  faqs: ServiceFAQ[];
  created_at: string;
  updated_at: string;
}
