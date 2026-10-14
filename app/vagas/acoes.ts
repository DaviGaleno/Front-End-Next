"use server";

import { revalidatePath } from "next/cache";
import { EsquemaDeArquivar } from "@/lib/esquemas";
import { arquivarVaga, buscarEmpresa } from "@/lib/api";
import { Estado } from "@/lib/tipos";
import { porCampo, valoresDe } from "@/lib/formulario";
import { redirect } from "next/dist/client/components/navigation";

export async function criarVaga(
  estadoAnterior: Estado,  dados: FormData,): Promise<Estado> {
  const valores = valoresDe(dados);

  const analise = EsquemaDaVaga.safeParse(Object.fromEntries(dados));

  if (!analise.success) {
    return { ok: false, erros: porCampo(analise.error), valores };
  }
  const empresa = await buscarEmpresa(analise.data.empresaSlug);
  if (!empresa) {
    return {
      ok: false,
      erros: { empresaSlug: "Essa empresa não está cadastrada." },
      valores,
    };
  }
  const vaga = {
    ...analise.data,
    id: crypto.randomUUID(),
    empresa: empresa.nome,
  };
  guardarVaga(vaga);

   revalidatePath("/vagas");

   redirect(`/vagas/${vaga.id}`);
}


export async function arquivar(dados: FormData) {
  const analise = EsquemaDeArquivar.safeParse(Object.fromEntries(dados));
  if (!analise.success) {
    throw new Error(analise.error.issues[0]?.message ?? "Vaga inválida.");
  }

  await arquivarVaga(analise.data.id);

  revalidatePath("/vagas");
}