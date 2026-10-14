"use client";

import { useActionState } from "react";
import { salvarEmpresa } from "./acoes";
import BotaoDeEnviar from "@/components/BotaoDeEnviar";
import { ESTADO_INICIAL } from "@/lib/tipos";
import type { Empresa } from "@/lib/tipos";

export default function FormularioDaEmpresa({ empresa }: { empresa: Empresa }) {
  // .bind prende o slug como PRIMEIRO argumento da ação. Ele viaja
  // junto, mas não como campo do formulário — então não dá para trocá-lo
  // mexendo no HTML da página.
  const acaoComSlug = salvarEmpresa.bind(null, empresa.slug);

  const [estado, acaoDoForm] = useActionState(acaoComSlug, ESTADO_INICIAL);

  return (
    <form action={acaoDoForm} className="form">
      {/* O ?? garante que o primeiro carregamento mostre o valor atual, e
          uma recusa devolva o que a pessoa tinha acabado de digitar. */}
      <label>
        Nome
        <input name="nome" defaultValue={estado.valores.nome ?? empresa.nome} />
      </label>
      {estado.erros.nome && <p className="erro">{estado.erros.nome}</p>}

      <label>
        Sobre
        <textarea name="sobre" defaultValue={estado.valores.sobre ?? empresa.sobre} />
      </label>
      {estado.erros.sobre && <p className="erro">{estado.erros.sobre}</p>}

      <BotaoDeEnviar>Salvar</BotaoDeEnviar>

      {/* O recado geral. role="status" faz o leitor de tela anunciar a
          mudança — quem não está olhando a tela precisa saber que salvou. */}
      {estado.mensagem && (
        <p role="status" className={estado.ok ? "ok" : "erro"}>{estado.mensagem}</p>
      )}
    </form>
  );
}