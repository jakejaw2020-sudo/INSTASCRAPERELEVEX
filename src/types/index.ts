export type ApiSecretKey =
  | 'openai_api_key'
  | 'apify_api_token'
  | 'meta_access_token'
  | 'meta_instagram_user_id'
  | 'supabase_url'
  | 'supabase_anon_key';

export interface BrandColor {
  id: string;
  hex: string;
  name: string;
}

export interface BrandAsset {
  id: string;
  name: string;
  type: 'logo' | 'font' | 'color_palette' | 'template_bg' | 'icon' | 'other';
  file_path: string | null;
  public_url: string | null;
  metadata: Record<string, string>;
  is_active: boolean;
  is_primary: boolean;
  created_at: string;
}

export interface ResearchTarget {
  id: string;
  url: string;
  account_name: string | null;
  status: 'pending' | 'scraping' | 'scraped' | 'analyzed' | 'used' | 'error';
  raw_data: ApifyResult[] | null;
  analysis: PostAnalysis | null;
  error_message: string | null;
  created_at: string;
  scraped_at: string | null;
  analyzed_at: string | null;
}

export interface ApifyResult {
  id: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  displayUrl: string;
  ownerUsername: string;
  ownerProfilePicUrl: string;
}

export interface PostAnalysis {
  hook_type: string;
  emotional_angle: string;
  information_density: 'low' | 'medium' | 'high';
  slide_structure: string;
  cta_type: string;
  performance_reason: string;
  brand_adaptation: string;
}

export interface GeneratedSlide {
  slide_index: number;
  headline: string;
  body_copy?: string;
  hook_label?: string;
  dalle_prompt?: string;
  dalle_image_url?: string;
  final_image_url?: string;
}

export interface GeneratedCarousel {
  cover: { headline: string; hook_label: string };
  slides: Array<{ slide_index: number; headline: string; body_copy: string }>;
  caption: string;
  hashtags: string;
  music_mood: 'focused' | 'energetic' | 'calm';
}

export interface CarouselPost {
  id: string;
  title: string;
  status: 'draft' | 'generating' | 'ready' | 'approved' | 'publishing' | 'published' | 'failed';
  caption: string;
  hashtags: string;
  music_mood: 'focused' | 'energetic' | 'calm' | null;
  slide_count: number;
  created_at: string;
  approved_at: string | null;
  instagram_post_id: string | null;
  deleted_at?: string | null;
}

export interface CarouselSlide {
  id: string;
  post_id: string;
  slide_index: number;
  slide_type: 'cover' | 'body';
  headline: string | null;
  body_copy: string | null;
  hook_label: string | null;
  dalle_prompt: string | null;
  dalle_image_url: string | null;
  final_image_url: string | null;
  instagram_container_id: string | null;
}

export interface AppSettings {
  id?: string;
  brand_name: string;
  brand_voice_prompt: string;
  compliance_disclaimer: string;
  default_hashtags: string;
  instagram_user_id: string;
  posting_schedule: { days: string[]; hour: number };
}

export interface GptParams {
  systemPrompt: string;
  userPrompt: string;
  jsonMode?: boolean;
}

export interface DalleParams {
  prompt: string;
  size?: '1024x1024';
  quality?: 'standard';
}

export interface PublishParams {
  slides: CarouselSlide[];
  caption: string;
}

declare global {
  interface Window {
    electronAPI: {
      getSecret: (key: ApiSecretKey) => Promise<string | null>;
      setSecret: (key: ApiSecretKey, value: string) => Promise<void>;
      deleteSecret: (key: ApiSecretKey) => Promise<void>;
      generateContent: (params: GptParams) => Promise<string>;
      generateImage: (params: DalleParams) => Promise<string>;
      scrapeInstagram: (url: string) => Promise<ApifyResult[]>;
      publishCarousel: (params: PublishParams) => Promise<string>;
      openFilePicker: (options: { filters: Array<{ name: string; extensions: string[] }>; properties: string[] }) => Promise<string[]>;
    };
  }
}
