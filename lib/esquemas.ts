import { z } from "zod";

// ─── FRENTE 1 ──────────────────────────────────────────────────────────
export const EsquemaDaVaga = z.object({
  titulo:      z.string().min(5, "O título precisa de pelo menos 5 letras."),
  empresaSlug: z.string().min(1, "Escolha a empresa."),
  area:        z.string().min(1, "Escolha a área."),
  senioridade: z.string().min(1, "Escolha a senioridade."),
  local:       z.string().min(1, "Diga onde é: remoto, híbrido ou a cidade."),
  descricao:   z.string()
                .min(80, "Descreva a vaga em pelo menos 80 caracteres.")
                .max(2000, "Passou de 2000 caracteres."),

  // O CHECKBOX. Desmarcado, a chave NÃO CHEGA — não vem `false`, não vem
  // string vazia: não vem nada. Marcado, vale o texto "on". Por isso o
  // par .optional() + .transform(), e não z.boolean().
  aceitaIniciante: z.literal("on").optional().transform((v) => v === "on"),
});

// ─── FRENTE 2 ──────────────────────────────────────────────────────────
// Repare no que NÃO está aqui: o slug. Ele é a chave que liga vaga e
// empresa; deixá-lo editável quebra a listagem da empresa em silêncio.
// Campo que não pode mudar não entra no esquema — assim, se alguém mandar
// um slug no POST, ele é simplesmente ignorado.
export const EsquemaDaEmpresa = z.object({
  nome:  z.string().min(2, "O nome não pode ficar em branco."),
  sobre: z.string()
          .min(40, "Conte um pouco mais: pelo menos 40 caracteres.")
          .max(600, "Passou de 600 caracteres."),
  site:  z.string().url("Precisa ser um endereço completo, com https://."),
});

// ─── FRENTE 3 ──────────────────────────────────────────────────────────
export const EsquemaDaCandidatura = z.object({
  vagaId: z.string().min(1),
  nome:   z.string().min(3, "Diga o seu nome completo."),
  email:  z.string().email("Esse e-mail não parece válido."),
});
import { z } from "zod";

export const EsquemaDeArquivar = z.object({
  id: z.string().min(1, "Vaga não informada."),
});