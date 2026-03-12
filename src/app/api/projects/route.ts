import { NextRequest, NextResponse } from "next/server";

export type Project = {
  id: number;
  name: string;
  link: string;
  description: string;
  stacks: string;
};

// Armazena projetos em memória enquanto o servidor estiver rodando.
// Para produção, substitua por um banco de dados real.
let projects: Project[] = [
  {
    id: 1,
    name: "Análise Exploratória Netflix",
    link: "https://github.com/gabrielneves/netflix-analysis",
    description:
      "Exploração do catálogo da Netflix utilizando Python, Pandas e Matplotlib para identificar tendências de crescimento e gêneros dominantes.",
    stacks: "Python, Pandas, Matplotlib, Data Science",
  },
  {
    id: 2,
    name: "PITON - AI Coder",
    link: "https://github.com/gabrielneves/piton-ai-coder",
    description:
      "Assistente de IA especializado em Python construído com Streamlit e Groq API para auxílio em debugging e boas práticas de código.",
    stacks: "Python, Streamlit, Groq API, AI",
  },
];

export async function GET() {
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.name || !body.link || !body.description) {
    return NextResponse.json(
      { error: "Campos obrigatórios não preenchidos." },
      { status: 400 },
    );
  }

  const newProject: Project = {
    id: Date.now(),
    name: String(body.name),
    link: String(body.link),
    description: String(body.description),
    stacks: String(body.stacks ?? ""),
  };

  projects = [newProject, ...projects];

  return NextResponse.json(newProject, { status: 201 });
}

