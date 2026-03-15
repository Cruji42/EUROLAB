export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
}

export interface NewsTag {
  id: number;
  name: string;
  slug: string;
}

export interface NewsPostCard {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  author_name: string | null;
  category: NewsCategory | null;
  tags: NewsTag[];
  is_featured: boolean;
  published_at: string;
}

export interface NewsCheck {
  id: number;
  label: string;
  sort_order: number;
}

export interface NewsPostDetail {
  id: number;
  slug: string;
  title: string;
  breadcrumb: string | null;
  excerpt: string | null;
  content: string;
  author_name: string | null;
  author_image_url: string | null;
  cover_image_url: string | null;

  section1_title: string | null;
  section1_paragraph: string | null;
  section2_title: string | null;
  section2_paragraph1: string | null;
  section2_paragraph2: string | null;
  section3_title: string | null;
  section3_paragraph1: string | null;
  section3_paragraph2: string | null;
  section4_title: string | null;
  section4_paragraph: string | null;
  blockquote: string | null;
  section5_title: string | null;
  section5_paragraph: string | null;

  category_id?: number | null;
  category: NewsCategory | null;
  checks: NewsCheck[];
  tags: NewsTag[];
  related_posts: NewsPostCard[];

  is_published?: boolean;
  is_featured: boolean;
  published_at: string;
  meta_title?: string | null;
  meta_description?: string | null;
  created_at: string;
  updated_at: string;
}
