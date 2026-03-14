const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const initialProjects = [
    {
        name: "Análise Exploratória Netflix",
        github_link: "https://github.com/Aiel-rgb/netflix-analysis",
        description: "Exploração do catálogo da Netflix utilizando Python, Pandas e Matplotlib para identificar tendências de crescimento e gêneros dominantes.",
        stacks: "Python, Pandas, Matplotlib",
        display_order: 1
    },
    {
        name: "PITON - AI Coder",
        github_link: "https://github.com/Aiel-rgb/piton-ai-coder",
        site_link: "https://aiel-rgb-piton-coder-ia-coder-qklja7.streamlit.app/",
        description: "Assistente de IA especializado em Python construído com Streamlit e Groq API para auxílio em debugging e boas práticas de código.",
        stacks: "Python, Streamlit, Groq API, AI",
        display_order: 2
    },
];

async function seed() {
    console.log('🌱 Semeando dados iniciais...');
    const { data, error } = await supabase.from('projects').insert(initialProjects);

    if (error) {
        console.error('❌ Erro ao semear:', error.message);
    } else {
        console.log('✅ Dados semeados com sucesso!');
    }
}

seed();
