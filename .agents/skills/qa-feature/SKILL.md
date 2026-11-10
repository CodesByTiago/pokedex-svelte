---
name: qa-feature
description: "Use for final QA of a SvelteKit feature: verify acceptance criteria, regressions, accessibility, and relevant project checks."
argument-hint: "Descreva a feature implementada e os critérios de aceitação"
---

# QA da feature

Esta é uma etapa final de verificação, não de implementação. Não altere arquivos: registre problemas encontrados para correção em uma etapa separada.

1. Identifique o épico relacionado em `docs/product/epics/` e use seus critérios de conclusão como critérios de aceitação; consulte `docs/product/prd.md` apenas se necessário.
2. Revise as alterações e a implementação relacionada. Consulte `docs/engineering/architecture.md` para validar limites de módulos e `docs/engineering/testing.md` para os requisitos de cobertura.
3. Para mudanças em interface, consulte `docs/engineering/styling.md` se necessário e verifique comportamento responsivo, acessibilidade e estados relevantes.
4. Para rotas públicas ou metadados, consulte `docs/engineering/seo.md` e avalie a execução de `vp run seo`.
5. Execute as verificações pertinentes disponíveis no projeto, como `vp check`, testes direcionados e a suíte de testes. Não declare sucesso para verificações que não foram executadas.
6. Apresente primeiro os problemas encontrados, com severidade e referências aos arquivos; depois resuma verificações aprovadas e não executadas.
7. Informe, critério a critério, se o épico foi atendido e se pode passar para **Concluído**. Não edite o documento do épico.
