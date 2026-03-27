CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE brand_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('logo', 'font', 'color_palette', 'template_bg', 'icon', 'other')),
  file_path TEXT,
  public_url TEXT,
  metadata JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE research_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  account_name TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scraping', 'scraped', 'analyzed', 'used', 'error')),
  raw_data JSONB,
  analysis JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  scraped_at TIMESTAMPTZ,
  analyzed_at TIMESTAMPTZ
);

CREATE TABLE carousel_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'ready', 'approved', 'publishing', 'published', 'failed')),
  source_target_id UUID REFERENCES research_targets(id),
  caption TEXT,
  hashtags TEXT,
  music_track_id TEXT,
  music_mood TEXT CHECK (music_mood IN ('focused', 'energetic', 'calm')),
  slide_count INTEGER DEFAULT 6,
  instagram_post_id TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  error_message TEXT
);

CREATE TABLE carousel_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES carousel_posts(id) ON DELETE CASCADE,
  slide_index INTEGER NOT NULL,
  slide_type TEXT DEFAULT 'body' CHECK (slide_type IN ('cover', 'body')),
  headline TEXT,
  body_copy TEXT,
  hook_label TEXT,
  dalle_prompt TEXT,
  dalle_image_url TEXT,
  final_image_url TEXT,
  instagram_container_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE music_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  artist TEXT,
  mood TEXT CHECK (mood IN ('focused', 'energetic', 'calm')),
  instagram_audio_id TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE app_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name TEXT DEFAULT 'Elevex Performance',
  brand_voice_prompt TEXT,
  compliance_disclaimer TEXT DEFAULT 'Not intended to diagnose, treat, cure, or prevent any disease.',
  default_hashtags TEXT,
  instagram_user_id TEXT,
  posting_schedule JSONB DEFAULT '{"days": ["monday","wednesday","friday"], "hour": 11}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO storage.buckets (id, name, public) VALUES ('brand-assets', 'brand-assets', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('generated-slides', 'generated-slides', true)
ON CONFLICT (id) DO NOTHING;
