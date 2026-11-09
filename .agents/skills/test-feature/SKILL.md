---
name: test-feature
description: "Use for the testing stage of a feature: create or update Vitest, Testing Library, or MSW tests for changed SvelteKit behavior."
argument-hint: "Descreva a feature e o comportamento a testar"
---

# Testes da feature

Esta etapa cria ou atualiza testes para uma implementação existente. Não altere o comportamento de produção; se os testes revelarem um defeito, descreva-o para ser corrigido na implementação.

1. Leia `docs/testing.md` para localizar os testes e aplicar os padrões do projeto.
2. Inspecione a implementação alterada e os testes próximos correspondentes. Consulte `docs/architecture.md` somente se precisar esclarecer limites entre feature, rota e módulos compartilhados.
3. Priorize comportamento observável e cenários relevantes de sucesso, erro, vazio e interação.
4. Para componentes Svelte, use Testing Library e consultas acessíveis. Para requisições HTTP, use MSW; não acesse serviços reais nem substitua por mocks a função cujo contrato está sendo testado.
5. Mantenha os testes junto ao módulo ou na pasta de testes da feature, seguindo a estrutura existente.
6. Execute os testes direcionados com o comando disponível no projeto. Se Vitest ou o comando de teste não estiver configurado, informe isso explicitamente; não instale dependências nem altere configuração sem solicitação.
7. Resuma os cenários cobertos e os comandos executados.
