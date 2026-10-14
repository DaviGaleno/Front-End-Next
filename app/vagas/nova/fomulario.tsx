import { Empresa, ESTADO_INICIAL } from "@/lib/tipos";
import { useActionState } from "react";
import { criarVaga } from "./acoes";

export default function FormularioDeVaga({ empresas }: { empresas: Empresa[] }) {
  
  const [estado, acaoDoForm] = useActionState(criarVaga, ESTADO_INICIAL);

  return (
    <form action={acaoDoForm} className="form">
      <label>
        Título
        {/* defaultValue, e NÃO value: com Server Actions o campo volta
            a ser não controlado. `value` sem `onChange` trava o campo. */}
        <input name="titulo" defaultValue={estado.valores.titulo} />
      </label>
      {estado.erros.titulo && <p className="erro">{estado.erros.titulo}</p>}

      <label>
        Empresa
        {/* <select>, e não campo de texto: assim ninguém digita um slug
            que não existe. A validação do passo 2 da ação continua sendo
            necessária — mas agora ela é a rede, não a porta. */}
        <select name="empresaSlug" defaultValue={estado.valores.empresaSlug ?? ""}>
          <option value="">Escolha…</option>
          {empresas.map((e) => (
            <option key={e.slug} value={e.slug}>{e.nome}</option>
          ))}
        </select>
      </label>
      {estado.erros.empresaSlug && <p className="erro">{estado.erros.empresaSlug}</p>}

      <label className="checkbox">
        <input type="checkbox" name="aceitaIniciante" />
        Aceita quem está começando
      </label>

      {/* ...os outros campos, no mesmo desenho... */}

      <BotaoDeEnviar>Publicar vaga</BotaoDeEnviar>
    </form>
  );
}