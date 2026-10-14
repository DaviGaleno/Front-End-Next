"use client";

import { useActionState } from "react";
import { enviarCandidatura } from "@/app/vagas/[id]/acoes";
import BotaoDeEnviar from "@/components/BotaoDeEnviar";
import { ESTADO_INICIAL } from "@/lib/tipos";

export default function FormularioDeCandidatura({ vaga }) {
  const [estado, acaoDoForm] = useActionState(enviarCandidatura, ESTADO_INICIAL);

  // A tela de sucesso da aula 03 continua existindo. O que mudou é quem
  // a liga: era um useState local, agora é o ok que veio do servidor.
  if (estado.ok) {
    return (
      <div className="ok" role="status">
        <h3>Candidatura enviada</h3>
        <p>A {vaga.empresa} vai receber o seu contato.</p>
      </div>
    );
  }

  return (
    <form action={acaoDoForm} className="form">
      {/* Campo escondido: a ação precisa saber de QUAL vaga é. Aqui um
          hidden serve — trocá-lo só faz a pessoa se candidatar a outra
          vaga pública, que é uma coisa que ela já podia fazer clicando. */}
      <input type="hidden" name="vagaId" value={vaga.id} />

      {/* Sem value, sem onChange, sem useState: o campo voltou a ser NÃO
          CONTROLADO, e é o <form> que sabe o que tem dentro dele. */}
      <label>
        Nome completo
        <input name="nome" defaultValue={estado.valores.nome} />
      </label>
      {estado.erros.nome && <p className="erro">{estado.erros.nome}</p>}

      <label>
        E-mail
        <input name="email" type="email" defaultValue={estado.valores.email} />
      </label>
      {estado.erros.email && <p className="erro">{estado.erros.email}</p>}

      {/* A LISTA. Vários checkboxes com o MESMO name — do outro lado,
          dados.getAll("habilidades"). É a forma que funciona sem JS. */}
      <fieldset>
        <legend>Habilidades</legend>
        {["HTML", "CSS", "JavaScript", "React", "SQL"].map((h) => (
          <label key={h}>
            <input type="checkbox" name="habilidades" value={h} /> {h}
          </label>
        ))}
      </fieldset>
      {estado.erros.habilidades && <p className="erro">{estado.erros.habilidades}</p>}

      <BotaoDeEnviar>Enviar candidatura</BotaoDeEnviar>
    </form>
  );
}