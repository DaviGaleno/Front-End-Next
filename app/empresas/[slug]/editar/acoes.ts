"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { buscarEmpresa } from "@/lib/api";
import type { Estado } from "@/lib/tipos";

export async function salvarEmpresa(anterior: Estado, dados: FormData): Promise<Estado> {
  const analise = EsquemaDaEmpresa.safeParse(Object.fromEntries(dados));
  if (!analise.success) {
    return { ok: false, erros: porCampo(analise.error), valores: valoresDe(dados) };
  }

  // upsert: cria se não existe, atualiza se existe. É exatamente a regra
  // de "o banco vence" virando uma chamada só.
  await prisma.empresa.upsert({
    where:  { slug: analise.data.slug },
    update: analise.data,
    create: analise.data,
  });

  revalidatePath("/empresas/" + analise.data.slug);
  return { ok: true, erros: {}, valores: {}, mensagem: "Perfil salvo." };
}