import type { Vaga, Empresa } from "@/lib/tipos";
import { prisma } from "@/lib/prisma";

const FONTE =
  "https://raw.githubusercontent.com/Um-Leque-de-Tecnologia/lequedevagas-web/main/dados";


const CACHE_VAGAS = { next: { revalidate: 60, tags: ["vagas"] } };

const CACHE_EMPRESAS = { next: { revalidate: 3600, tags: ["empresas"] } };

async function buscarVagasPublicadas(): Promise<Vaga[]> {
  const resposta = await fetch(`${FONTE}/vagas.json`, CACHE_VAGAS);

  if (!resposta.ok) {
    throw new Error(`vagas.json respondeu ${resposta.status}`);
  }

  return resposta.json();
}

export async function listarVagas(): Promise<Vaga[]> {
  const [publicadas, criadas, arquivadas] = await Promise.all([
    buscarVagasPublicadas(),
    prisma.vaga.findMany({
      where: { arquivada: false },
      orderBy: { criadaEm: "desc" },
    }),
    prisma.vaga.findMany({
      where: { arquivada: true },
      select: { id: true },
    }),
  ]);
  const idsNoBanco = new Set([
    ...criadas.map((vaga) => vaga.id),
    ...arquivadas.map((vaga) => vaga.id),
  ]);

  return [...criadas, ...publicadas.filter((vaga) => !idsNoBanco.has(vaga.id))];
}

export async function arquivarVaga(id: string): Promise<void> {
  const existente = await prisma.vaga.findUnique({ where: { id } });

  if (existente) {
    await prisma.vaga.update({
      where: { id },
      data: { arquivada: true },
    });
    return;
  }

  const publicada = (await buscarVagasPublicadas()).find((vaga) => vaga.id === id);
  if (!publicada) {
    throw new Error(`A vaga ${id} não existe mais.`);
  }

  await prisma.vaga.create({
    data: { ...publicada, arquivada: true },
  });
}

export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  const vagas = await listarVagas();
  return vagas.find((vaga) => vaga.id === id);
}

export async function listarEmpresas(): Promise<Empresa[]> {
  const resposta = await fetch(`${FONTE}/empresas.json`, CACHE_EMPRESAS);
  if (!resposta.ok) {
    throw new Error(`empresas.json respondeu ${resposta.status}`);
  }
  return resposta.json();
}

export async function buscarEmpresa(slug: string): Promise<Empresa | undefined> {
  const editada = await prisma.empresa.findUnique({ where: { slug } });
  if (editada) return editada;

  const publicadas = await listarEmpresas();
  return publicadas.find((empresa) => empresa.slug === slug);
}