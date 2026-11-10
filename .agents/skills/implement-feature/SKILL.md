---
name: implement-feature
description: "Use for the implementation stage when building or changing a SvelteKit page, feature, route, or user-facing behavior in this Pokédex project."
argument-hint: "Descreva a feature ou mudança desejada"
---

# Implementação da feature

Esta etapa implementa o comportamento solicitado. A criação dos testes, a avaliação de SEO e o QA final são etapas separadas; não as execute aqui, a menos que o usuário peça para combinar etapas.

1. Identifique o épico relacionado: use o indicado no pedido; senão, procure nos READMEs das sprints em `docs/product/epics/`. Se houver mais de uma possibilidade, pergunte ao usuário qual usar. Leia o documento do épico em `docs/product/epics/sprint-NN/<epic-slug>.md` e use seus critérios de conclusão e tarefas como critérios de aceitação; se o épico não existir, peça para usar `po-feature` primeiro; se houver pendências de definição em aberto, peça a decisão ao usuário antes de implementar. Consulte `docs/product/prd.md` somente se precisar confirmar requisitos do produto.
2. Consulte `docs/engineering/architecture.md` para mudanças na estrutura, rotas, limites entre módulos ou acesso a dados.
3. Para alterações de interface ou estilos, consulte `docs/engineering/styling.md`. Não leia documentos de testes ou SEO nesta etapa, a menos que a tarefa também inclua esses assuntos.
4. Inspecione uma implementação semelhante no código para seguir os padrões existentes.
5. Implemente a mudança nos módulos apropriados, respeitando as regras gerais do `AGENTS.md`.
6. Atualize o épico: marque como `- [x]` somente as tarefas de implementação concluídas e mude o status para **Em andamento** ou, se todas as tarefas de implementação e testes estiverem concluídas, **Implementado**. Mantenha o mesmo status na tabela do README da sprint (`docs/product/epics/sprint-NN/README.md`), cujo `## Status` passa para **Em andamento** quando o primeiro épico for iniciado (e o link da sprint no `docs/product/roadmap.md` reflete esse status). Nunca marque o épico como **Concluído**; isso depende do QA.
7. Ao terminar, resuma os arquivos e comportamentos alterados e indique que as etapas de testes, SEO (se aplicável) e QA podem ser executadas separadamente.
