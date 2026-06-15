export interface CertificationCard {
  id: number;
  slug: string;
  title: string;
  issuing_body: string;
  cert_type: string;
  excerpt: string | null;
  cover_image_url: string | null;
  certificate_file_url: string | null;
  is_active: boolean;
  issued_at: string | null;
  expires_at: string | null;
}

export interface CertificationDetail {
  id: number;
  slug: string;
  title: string;
  issuing_body: string;
  cert_type: string;
  excerpt: string | null;
  description: string | null;
  cover_image_url: string | null;
  certificate_file_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  issued_at: string | null;
  expires_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}
