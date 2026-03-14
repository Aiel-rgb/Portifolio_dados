import { supabase } from '../src/lib/supabase';

async function setupDatabase() {
    console.log('🚀 Iniciando configuração do banco de dados no Supabase...');

    const { error } = await supabase.rpc('create_projects_table', {});

    // Como não podemos criar tabelas via RPC sem definir a função antes, 
    // vamos tentar um select simples para ver se a tabela existe.
    const { error: selectError } = await supabase.from('projects').select('*').limit(1);

    if (selectError) {
        console.log('❌ Tabela "projects" não encontrada ou erro de conexão.');
        console.log('Tentando criar via SQL (Instrução: Por favor, execute o SQL abaixo no painel SQL do Supabase):');
        console.log(`
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
    `);
    } else {
        console.log('✅ Conexão estabelecida e tabela "projects" verificada!');
    }
}

setupDatabase();
