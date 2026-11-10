# Product Epics

Os épicos ficam agrupados por sprint, em `epics/sprint-NN/<epic-slug>.md`. Eles são criados pelo Product Owner (skill `po-feature`) a partir do [roadmap](../roadmap.md).

```text
epics/
├── sprint-01/
│   ├── README.md
│   └── comparison-versus-marker.md
└── sprint-02/
    ├── README.md
    └── <epic-slug>.md
```

Cada sprint tem um `README.md` com o status da sprint (**Planejada**, **Em andamento** ou **Encerrada**), a iniciativa atendida, a tabela de épicos com seus status e, ao encerrar, o que foi entregue, o que não foi entregue e o que foi movido para a próxima sprint.

## Regras

- A numeração das sprints é global e auto incrementada: a próxima sprint é sempre o maior `NN` existente em `epics/` mais 1 (ou `01`). Nunca reutilize nem renumere uma sprint.
- `<epic-slug>` é em inglês, minúsculo e com hífens. Cada épico pertence a uma única sprint.
- Ao encerrar uma sprint, os épicos não **Concluídos** são movidos para a próxima sprint, criada se necessário, preservando o status e as tarefas já marcadas. A sprint encerrada registra o que foi movido.
- Para listar os épicos e seus status, consulte o README da sprint; este índice não os repete.

## Sprints

- [Sprint 01](./sprint-01/README.md)

## Status e acompanhamento

Cada épico tem uma seção `## Status` com um destes valores, que deve ser mantido igual na tabela do README da sprint:

- **Planejado:** nenhuma tarefa iniciada ou pendências de definição em aberto.
- **Em andamento:** ao menos uma tarefa iniciada.
- **Implementado:** todas as tarefas de implementação e testes concluídas, aguardando QA.
- **Concluído:** QA aprovou os critérios de conclusão.

As tarefas usam caixas de seleção (`- [ ]` e `- [x]`) no documento do épico, que é a fonte do andamento. Marque uma tarefa somente quando o trabalho correspondente tiver sido feito e verificado.

Quem altera o status:

- `implement-feature` marca as tarefas de implementação e passa o épico para **Em andamento** ou **Implementado**.
- `test-feature` marca as tarefas de testes.
- `qa-feature` não altera arquivos; informa se os critérios foram atendidos. Após a aprovação, o épico passa para **Concluído** em uma atualização separada.
