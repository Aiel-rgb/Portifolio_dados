-- Execute este SQL no Painel SQL (SQL Editor) do seu projeto Supabase

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  github_link TEXT NOT NULL,
  site_link TEXT,
  stacks TEXT NOT NULL,
  display_order SERIAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Segurança) mas deixar leitura pública por enquanto
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública" ON projects
  FOR SELECT USING (true);

-- Política para permitir inserção/edição (você pode restringir isso depois)
CREATE POLICY "Permitir modificação anônima" ON projects
  FOR ALL USING (true);
