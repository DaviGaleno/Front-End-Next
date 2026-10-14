"use server";

import { EsquemaDaCandidatura } from "@/lib/esquemas";
import { porCampo, valoresDe } from "@/lib/formulario";
import { buscarVaga, guardarCandidatura } from "@/lib/api";
import type { Estado } from "@/lib/tipos";

export async function enviarCandidatura(
  estadoAnterior: Estado,
  dados: FormData,
): Promise<Estado> {
  const valores = valoresDe(dados);

  const analise = EsquemaDaCandidatura.safeParse(Object.fromEntries(dados));
  if (!analise.success) {
    return { ok: false, erros: porCampo(analise.error), valores };
  }

  // As habilidades são uma LISTA, e Object.fromEntries só guarda o último
  // valor de cada chave repetida. Para lista existe o getAll — é por isso
  // que ela é lida separada, e não pelo esquema junto com o resto.
  const habilidades = dados.getAll("habilidades").map(String);

  // A regra da aula 03 que estava no useState continua existindo — só
  // mudou de lado. Se ela sumir na tradução, a entrega REGREDIU.
  if (habilidades.length === 0) {
    return { ok: false, erros: { habilidades: "Escolha ao menos uma habilidade." }, valores };
  }

  const vaga = await buscarVaga(analise.data.vagaId);
  if (!vaga) {
    return { ok: false, erros: {}, valores, mensagem: "Essa vaga não existe mais." };
  }

  guardarCandidatura({
    ...analise.data,
    habilidades,
    id: crypto.randomUUID(),
    enviadaEm: new Date().toISOString(),
  });

  // Nenhum revalidate aqui: nenhuma tela pública mostra candidatura. Sim,
  // isto é de propósito — revalidar "por garantia" é jogar fora cache que
  // ninguém pediu para jogar.
  return { ok: true, erros: {}, valores: {}, mensagem: "Candidatura enviada!" };
}