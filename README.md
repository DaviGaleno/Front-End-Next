# Leque de Vagas

Aplicação web de vagas de tecnologia para pessoas que estão migrando de carreira. O objetivo é ajudar a encontrar oportunidades de entrada com mais rapidez, usando busca, filtros por área e informações claras sobre senioridade, local de trabalho e aceitação de iniciantes.

Este é o projeto em equipe desenvolvido para o curso [Introdução ao Next.js](https://aulas.umlequedetecnologia.com.br/cursos/introducao-nextjs), a partir do briefing da professora. O produto tem quatro frentes de trabalho, com responsabilidades individuais e código integrado no mesmo repositório.

**Repositório da equipe:** [DaviGaleno/Front-End-Next](https://github.com/DaviGaleno/Front-End-Next)

## Equipe e frentes

| Integrante | Frente | Responsabilidade |
| --- | --- | --- |
| Cinthya Alves | 1 — Vaga | Dados, exibição, detalhes e publicação de vagas |
| Elyaquim | 2 — Empresa | Perfil da empresa, abas e edição de informações |
| João Victor | 3 — Pessoa e candidatura | Formulário e envio de candidaturas |
| Davi Galeno | 4 — Busca e números | Busca, filtros e contagens do catálogo |

As frentes são partes do mesmo produto: compartilham tipos, dados, rotas e banco de dados, e precisam funcionar juntas.

## Funcionalidades implementadas

- Catálogo com 12 vagas iniciais e cinco empresas, mantidos nos arquivos JSON em [`dados/`](./dados/).
- Listagem com busca por título ou empresa, filtro por área e contagens de vagas e oportunidades para iniciantes.
- Página de detalhes da vaga, descrição expansível e opção de copiar o link.
- Formulário para publicar uma vaga, com validação e gravação no banco.
- Perfil da empresa com informações, vagas relacionadas, abas e formulário para editar o perfil.
- Formulário de candidatura com validação de nome e e-mail e seleção de habilidades.
- Arquivamento de vagas por Server Action; vagas arquivadas deixam de aparecer no catálogo.
- Persistência local com SQLite e Prisma para vagas criadas, empresas editadas, candidaturas e arquivamento.
- Páginas institucionais e navegação pelo App Router.

### Situação e próximos passos

O projeto está em desenvolvimento contínuo conforme o curso. O briefing descreve entregas progressivas; por isso, nem todos os itens previstos para as próximas etapas estão implementados ainda.

Entre os próximos passos estão autenticação, proteção das ações de publicação e edição, controle de permissões por papel e propriedade das vagas, edição e remoção de vagas, filtros compartilháveis pela URL, paginação, testes automatizados, CI no GitHub Actions, deploy e melhorias de SEO e performance.

**Importante:** ainda não há autenticação. As ações que alteram dados não devem ser consideradas protegidas para uso público em produção.

## Tecnologias

- Next.js 16 com App Router
- React 19 e TypeScript
- CSS
- Prisma e SQLite
- Zod para validação de formulários

## Executar localmente

Requisitos: Node.js 20 ou superior e npm.

1. Clone o repositório e instale as dependências:

   ```bash
   git clone https://github.com/DaviGaleno/Front-End-Next.git
   cd Front-End-Next
   npm install
   ```

2. Crie o arquivo `.env` a partir do exemplo. No PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

   Em macOS ou Linux:

   ```bash
   cp .env.example .env
   ```

   O exemplo configura o SQLite local com `DATABASE_URL="file:./dev.db"`. Não envie o `.env` para o Git.

3. Aplique as migrations e inicie o servidor:

   ```bash
   npm run db:migrate
   npm run dev
   ```

4. Abra <http://localhost:3000>.

O comando `npm run dev` também aplica as migrations pendentes antes de iniciar o Next.js.

## Comandos úteis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Aplica migrations pendentes e inicia o modo de desenvolvimento |
| `npm run db:migrate` | Cria/aplica migrations durante o desenvolvimento |
| `npm run build` | Aplica migrations pendentes e gera o build de produção |
| `npm run start` | Inicia o servidor de produção após o build |

## Rotas principais

| Rota | Conteúdo |
| --- | --- |
| `/` | Página inicial |
| `/vagas` | Catálogo, busca, filtro, contagens e arquivamento |
| `/vagas/[id]` | Detalhes da vaga e formulário de candidatura |
| `/vagas/nova` | Publicação de vaga |
| `/empresas` | Lista de empresas |
| `/empresas/[slug]` | Perfil da empresa e suas vagas |
| `/empresas/[slug]/editar` | Edição do perfil da empresa |
| `/sobre`, `/termos`, `/privacidade` | Páginas institucionais |

## Organização do projeto

```text
app/          Rotas, layouts e Server Actions
components/   Componentes de interface
dados/        Catálogo inicial de vagas e empresas em JSON
lib/          Tipos, acesso aos dados, Prisma e validações
prisma/       Schema SQLite e migrations
```

O schema Prisma reúne os modelos compartilhados de vaga, empresa e candidatura. As migrations devem ser mantidas versionadas e integradas com as alterações de todas as frentes.

## Referências do curso

- [Introdução ao Next.js — aulas e materiais](https://aulas.umlequedetecnologia.com.br/cursos/introducao-nextjs)
- [Briefing e rubrica do projeto](https://cdn.aulas.umlequedetecnologia.com.br/public/introducao-nextjs/projeto/brief.html)
- [Projeto de referência do curso](https://github.com/Um-Leque-de-Tecnologia/lequedevagas-web)
