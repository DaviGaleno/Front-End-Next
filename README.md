# Leque de Vagas

Projeto de referência do curso **Introdução ao Next.js** (NickDev). Um mural de
vagas de tecnologia para quem está migrando de carreira.

## Equipe
Cinthya Alves		
Davi Galeno		
Elyaquim Neves		
João Victor Dantas		

## Componente
Um componente é uma unidade modular e reutilizável da interface de uma aplicação, responsável por encapsular uma estrutura de apresentação e, quando necessário, sua lógica e seu comportamento. 


## Estrutura

```
app/
├── layout.tsx                     moldura do site + cabeçalho
├── page.tsx                       /
├── not-found.tsx                  404 do site inteiro
├── globals.css
├── sobre/page.tsx                 /sobre
├── (institucional)/               route group — não entra na URL
│   ├── layout.tsx
│   ├── termos/page.tsx            /termos
│   └── privacidade/page.tsx       /privacidade
├── vagas/
│   ├── layout.tsx                 moldura da área de vagas
│   ├── loading.tsx                espera da listagem
│   ├── page.tsx                   /vagas — não é async; dois <Suspense>
│   └── [id]/
│       ├── page.tsx               /vagas/1 — generateStaticParams
│       ├── loading.tsx            esqueleto do detalhe
│       ├── error.tsx              a rede caiu
│       └── not-found.tsx          a vaga não existe
└── empresas/
    ├── page.tsx                   /empresas
    └── [slug]/page.tsx            /empresas/aurora-tech
components/                        as peças; só as com memória são de cliente
dados/                             vagas.json e empresas.json — a fonte
prisma/                            schema local mínimo e migration da frente 4
lib/
├── tipos.ts                       tipos do projeto
├── api.ts                         o único arquivo que conhece a URL
└── prisma.ts                      cliente SQLite reutilizado no hot reload
```

## Licença

Material didático do NickDev. Use para estudar, cite quando reaproveitar.
