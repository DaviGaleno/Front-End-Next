import { listarVagas } from "@/lib/api";

export default async function NumerosDoCatalogo() {
  const vagas = await listarVagas();
  const iniciantes = vagas.filter((vaga) => vaga.aceitaIniciante).length;

  return (
    <p className="numeros">
      <strong>{vagas.length}</strong> vagas ·{" "}
      <strong>{iniciantes}</strong> aceitam quem está começando
    </p>
  );
}
