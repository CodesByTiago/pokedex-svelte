---
name: po-feature
description: "Use as Product Owner to read the roadmap and plan delivery: open a sprint, create its epic documents in docs/product/epics/sprint-NN/, and close a sprint moving unfinished epics to the next one."
argument-hint: "Informe a iniciativa do roadmap a planejar ou a sprint a encerrar"
---

# Product Owner: épicos e sprints

Esta etapa transforma as iniciativas do roadmap em entrega: abre sprints, escolhe e documenta seus épicos e encerra sprints. Não altera iniciativas ou prioridades (use `roadmap-feature`) e não implementa código, testes ou SEO.

## Estrutura

```text
docs/product/epics/
├── sprint-01/
│   ├── README.md
│   └── <epic-slug>.md
└── sprint-02/
    ├── README.md
    └── <epic-slug>.md
```

- `<epic-slug>` é em inglês, minúsculo e com hífens (ex.: `improve-catalog-pagination`).
- A numeração das sprints é global e auto incrementada: o maior `NN` existente em `docs/product/epics/` mais 1 (ou `01`), com dois dígitos. Nunca reutilize nem renumere.
- Cada épico pertence a uma única sprint.

## Planejar uma sprint

1. Leia `docs/product/roadmap.md` e identifique a iniciativa e as prioridades a atender. Se a iniciativa não existir, pare e peça para usar `roadmap-feature`. Leia `docs/product/prd.md` e `docs/product/epics/` para evitar duplicidade.
2. Defina com o usuário o objetivo da sprint e quais épicos entram. Não invente decisões de produto: registre dúvidas em `## Pendências` do épico e pergunte ao usuário quando afetarem o escopo.
3. Crie `docs/product/epics/sprint-NN/README.md` com `# Sprint NN`, `## Status` (**Planejada**), `## Iniciativa` (nome da iniciativa do roadmap), `## Objetivo`, `## Épicos` (tabela com link e status de cada épico), `## Entregue`, `## Não entregue` e `## Movido para a próxima sprint` (as três últimas começam com "Preenchido ao encerrar a sprint.").
4. Para cada épico, crie `sprint-NN/<epic-slug>.md` com `## Status` (**Planejado**), `## Contexto`, `## Objetivo`, `## Escopo` (incluído e fora do escopo), `## Critérios de conclusão`, `## Tarefas` e `## Pendências`. As tarefas são ações concretas com caixas `- [ ]`, cobrindo implementação, testes e verificação em QA, sem virar detalhes de código. Links para o PRD usam `../../prd.md`.
5. Adicione a sprint ao roadmap apenas como link para `./epics/sprint-NN/README.md` com seu status, sob a iniciativa correspondente, e ao índice `docs/product/epics/README.md`. Não copie a lista de épicos nem seus status para o roadmap.
6. Resuma a sprint criada, os épicos e suas pendências.

## Encerrar uma sprint

Faça isso somente quando o usuário pedir.

1. Leia o README da sprint e o documento de cada épico; confirme o status real. Épicos **Concluídos** foram entregues; os demais (Planejado, Em andamento ou Implementado) não.
2. Preencha no README da sprint: `## Entregue` (épicos concluídos e o que foi entregue), `## Não entregue` (épicos e tarefas `- [ ]` pendentes) e `## Movido para a próxima sprint`. Mude `## Status` para **Encerrada**.
3. Se houver épicos não concluídos, crie a próxima sprint (maior `NN` + 1) como em "Planejar uma sprint" e mova cada arquivo de épico para ela (use `git mv` quando possível). Preserve o conteúdo, o status e as caixas marcadas; não reabra tarefas concluídas. Registre cada épico movido em `## Movido para a próxima sprint` da sprint encerrada e na tabela da nova sprint. Um épico nunca pertence a duas sprints: a tabela da sprint encerrada não o lista mais como pertencente a ela.
4. Atualize os links no roadmap, no índice de épicos e nos demais documentos que apontem para os arquivos movidos.
5. Não altere o status de nenhum épico nem marque tarefas ao encerrar; isso depende de implementação, testes e QA.

## Fonte da verdade

- O andamento de cada épico (status e tarefas) vive no documento do épico.
- O README da sprint espelha o status dos épicos em sua tabela e registra as entregas; mantenha-o igual ao documento do épico.
- O roadmap não guarda status de épicos.
