"use server";

import { buscarEmpresa } from "@/lib/api";
import { porCampo, valoresDe } from "@/lib/formulario";
import { Estado } from "@/lib/tipos";
import { redirect } from "next/dist/client/components/navigation";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

export async function criarVaga(
  estadoAnterior: Estado,
  dados: FormData,
): Promise<Estado> {
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