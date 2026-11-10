---
name: roadmap-feature
description: "Use when creating or updating the product roadmap: defining initiatives, objectives and priorities in docs/product/roadmap.md, which the Product Owner (po-feature) later turns into sprints and epics."
argument-hint: "Descreva a iniciativa ou a mudança de prioridade no roadmap"
---

# Roadmap do produto

Esta etapa cria ou atualiza `docs/product/roadmap.md`, que registra a **estratégia**: iniciativas, objetivos e prioridades. Não crie épicos nem sprints (use `po-feature`) e não implemente código.

1. Leia `docs/product/prd.md` para confirmar o escopo do produto e evitar iniciativas conflitantes ou duplicadas, e `docs/product/roadmap.md` para preservar a estrutura existente.
2. Esclareça o objetivo e o resultado esperado de cada iniciativa. Não invente prioridades ou prazos; registre como "a definir" o que não puder inferir com segurança e pergunte ao usuário quando a decisão afetar o escopo.
3. Para cada iniciativa, mantenha o formato existente: título `## Iniciativa: <nome>`, **Objetivo**, **Prioridade e cronograma** e **Sprints** (links para `./epics/sprint-NN/README.md`, adicionados pela `po-feature`).
4. Não copie para o roadmap a lista de épicos nem seus status; eles vivem na sprint e no documento do épico.
5. Se a mudança alterar requisitos do produto, aponte que `prd-feature` deve atualizar `docs/product/prd.md`; não altere o PRD aqui.
6. Resuma as iniciativas registradas e as decisões pendentes, e indique que `po-feature` pode planejar as sprints.
