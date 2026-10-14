import { z } from "zod";

export const EsquemaDaVaga = z.object({
  titulo:      z.string().min(5, "O título precisa de pelo menos 5 letras."),
  empresaSlug: z.string().min(1, "Escolha a empresa."),
  area:        z.string().min(1, "Escolha a área."),
  senioridade: z.string().min(1, "Escolha a senioridade."),
  local:       z.string().min(1, "Diga onde é: remoto, híbrido ou a cidade."),
  descricao:   z.string()
                .min(80, "Descreva a vaga em pelo menos 80 caracteres.")
                .max(2000, "Passou de 2000 caracteres."),
  aceitaIniciante: z.literal("on").optional().transform((v) => v === "on"),
});

export const EsquemaDeArquivar = z.object({
  id: z.string().min(1, "Vaga não informada."),
});