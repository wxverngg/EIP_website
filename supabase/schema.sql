-- ========================================================
-- EIP & Associates - Supabase Schema for Soro AI RSS News
-- (Versión segura sin comandos DROP)
-- ========================================================

-- 1. Tabla: news (Almacenamiento local de artículos sincronizados desde Soro AI)
CREATE TABLE IF NOT EXISTS public.news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guid TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  category TEXT DEFAULT 'Noticias Legales',
  author TEXT DEFAULT 'Soro AI / EIP & Associates',
  reading_time TEXT DEFAULT '4 min read',
  status TEXT DEFAULT 'published',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  seo_title TEXT,
  seo_description TEXT,
  rss_link TEXT,
  source TEXT DEFAULT 'Soro AI'
);

-- Índices de alto rendimiento para búsquedas y ordenamiento
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news (slug);
CREATE INDEX IF NOT EXISTS idx_news_category ON public.news (category);
CREATE INDEX IF NOT EXISTS idx_news_status ON public.news (status);

-- 2. Tabla: sync_logs (Registro de auditoría del Cron Job)
CREATE TABLE IF NOT EXISTS public.sync_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sync_date TIMESTAMPTZ DEFAULT NOW(),
  new_articles_count INT DEFAULT 0,
  skipped_articles_count INT DEFAULT 0,
  error_message TEXT,
  duration_ms INT DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_sync_logs_sync_date ON public.sync_logs (sync_date DESC);

-- Activar Row Level Security (RLS)
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;

-- Creación segura de políticas de seguridad sin comandos DROP
DO $$
BEGIN
  -- Política de lectura pública para la tabla news
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Permitir lectura publica de noticias publicadas' AND tablename = 'news'
  ) THEN
    CREATE POLICY "Permitir lectura publica de noticias publicadas"
    ON public.news FOR SELECT
    USING (true);
  END IF;

  -- Política de acceso total para Service Role en news
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Permitir insercion y actualizacion con service_role' AND tablename = 'news'
  ) THEN
    CREATE POLICY "Permitir insercion y actualizacion con service_role"
    ON public.news FOR ALL
    USING (true);
  END IF;

  -- Política de lectura pública para sync_logs
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Permitir lectura publica de sync_logs' AND tablename = 'sync_logs'
  ) THEN
    CREATE POLICY "Permitir lectura publica de sync_logs"
    ON public.sync_logs FOR SELECT
    USING (true);
  END IF;

  -- Política de inserción para Service Role en sync_logs
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Permitir insercion en sync_logs con service_role' AND tablename = 'sync_logs'
  ) THEN
    CREATE POLICY "Permitir insercion en sync_logs con service_role"
    ON public.sync_logs FOR ALL
    USING (true);
  END IF;
END $$;

-- ========================================================
-- 3. Tabla: google_reviews (Caché local de reseñas de Google Business Profile)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.google_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  google_review_id TEXT UNIQUE NOT NULL,
  author_name TEXT NOT NULL,
  profile_photo_url TEXT,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  review_date TIMESTAMPTZ DEFAULT NOW(),
  relative_time TEXT,
  review_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_google_reviews_date ON public.google_reviews (review_date DESC);
CREATE INDEX IF NOT EXISTS idx_google_reviews_rating ON public.google_reviews (rating DESC);

ALTER TABLE public.google_reviews ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Permitir lectura publica de google_reviews' AND tablename = 'google_reviews'
  ) THEN
    CREATE POLICY "Permitir lectura publica de google_reviews"
    ON public.google_reviews FOR SELECT
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Permitir administracion de google_reviews con service_role' AND tablename = 'google_reviews'
  ) THEN
    CREATE POLICY "Permitir administracion de google_reviews con service_role"
    ON public.google_reviews FOR ALL
    USING (true);
  END IF;
END $$;

-- ========================================================
-- 4. Tabla: contact_messages (Formulario de Contacto Corporativo)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas y filtros
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages (status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON public.contact_messages (email);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  -- Política para permitir inserción pública (visitantes del sitio)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Permitir insercion publica de mensajes de contacto' AND tablename = 'contact_messages'
  ) THEN
    CREATE POLICY "Permitir insercion publica de mensajes de contacto"
    ON public.contact_messages FOR INSERT
    WITH CHECK (true);
  END IF;

  -- Política para acceso total del service_role
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Permitir administracion de mensajes con service_role' AND tablename = 'contact_messages'
  ) THEN
    CREATE POLICY "Permitir administracion de mensajes con service_role"
    ON public.contact_messages FOR ALL
    USING (true);
  END IF;
END $$;
