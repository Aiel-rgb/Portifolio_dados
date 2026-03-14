import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export type Project = {
  id: string; // Mudado para string pois o UUID do Supabase é string
  name: string;
  github_link: string;
  site_link?: string;
  description: string;
  stacks: string;
  display_order: number;
};

// GET: Lista todos os projetos ordenados
export async function GET() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST: Cria um novo projeto
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.name || !body.link || !body.description) {
    return NextResponse.json(
      { error: "Campos obrigatórios não preenchidos." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        name: String(body.name),
        github_link: String(body.link),
        site_link: body.siteLink ? String(body.siteLink) : null,
        description: String(body.description),
        stacks: String(body.stacks ?? ""),
      }
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// PUT: Atualiza um projeto ou reordena
export async function PUT(req: NextRequest) {
  const body = await req.json();

  // Caso seja uma reordenação em massa
  if (body.reorder && Array.isArray(body.projects)) {
    // Atualiza cada projeto com sua nova ordem
    const updates = body.projects.map((p: any, index: number) => ({
      id: p.id,
      display_order: index,
    }));

    // Upsert para atualizar múltiplos registros
    const { error } = await supabase.from("projects").upsert(updates);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Reordenação salva." });
  }

  // Caso seja atualização de um projeto específico
  const { id, ...updates } = body;
  if (!id) {
    return NextResponse.json({ error: "ID não fornecido." }, { status: 400 });
  }

  // Mapear campos do frontend para campos do banco
  const dbUpdates: any = { ...updates };
  if (updates.link) dbUpdates.github_link = updates.link;
  if (updates.siteLink) dbUpdates.site_link = updates.siteLink;

  const { data, error } = await supabase
    .from("projects")
    .update(dbUpdates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE: Remove um projeto
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID não fornecido." }, { status: 400 });
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Projeto excluído com sucesso." });
}

