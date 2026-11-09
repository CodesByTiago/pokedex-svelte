---
name: implement-feature
description: "Use when creating or changing a SvelteKit page, feature, route, or user-facing behavior in this Pokédex project."
argument-hint: "Descreva a feature ou mudança desejada"
---

# Implementar uma feature

Use esta skill para orientar o fluxo de implementação sem carregar documentação que não se aplica à tarefa.

1. Entenda o escopo. Consulte `docs/prd.md` somente quando precisar confirmar requisitos ou regras do produto.
2. Consulte `docs/architecture.md` para mudanças na estrutura de uma feature, rotas, limites entre módulos ou acesso a dados.
3. Consulte apenas os documentos adicionais pertinentes:
   - `docs/testing.md` para criar ou alterar testes.
   - `docs/styling.md` para mudanças de interface ou estilos.
   - `docs/seo.md` para rotas públicas, metadados ou auditoria SEO.
4. Inspecione uma implementação semelhante no código antes de definir novos padrões.
5. Mantenha cada página em sua própria feature; deixe `src/routes` como camada de conexão e composição.
6. Coloque código reutilizado por mais de uma página em `src/lib/shared` e respeite as APIs públicas das features.
7. Use Svelte 5 e TypeScript estrito. Mantenha os estilos em `.module.css`, conforme os padrões do projeto.
8. Adicione ou atualize testes para o comportamento afetado. Não dependa de chamadas reais à PokéAPI.
9. Execute as verificações pertinentes, incluindo `vp check` e, quando Vitest estiver configurado, `vp test`.
10. Ao concluir, resuma as alterações e informe os comandos de validação executados.
