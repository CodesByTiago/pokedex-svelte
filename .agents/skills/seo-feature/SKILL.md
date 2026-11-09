---
name: seo-feature
description: "Use when adding or reviewing SEO for public SvelteKit routes, including page titles, meta descriptions, SSR content, robots.txt, or Lighthouse audits."
argument-hint: "Informe a rota pública ou mudança de SEO"
---

# SEO da feature

Use esta etapa somente quando uma mudança afetar uma rota pública ou seus metadados. Ela pode implementar os ajustes de SEO solicitados e verificar o resultado; QA geral permanece separado.

1. Leia `docs/seo.md` para os requisitos, localização dos metadados e procedimento de auditoria.
2. Inspecione a rota e o código de uma página pública semelhante. Consulte `docs/architecture.md` somente se precisar entender o fluxo de SSR ou os limites da rota e feature.
3. Aplique metadados específicos à rota e preserve o SSR, conforme os padrões documentados. Não altere regras de rastreamento sem confirmar a intenção do produto.
4. Execute `vp run seo` quando a tarefa exigir auditoria e o ambiente tiver Chrome ou Chromium disponível. Se não puder executar, informe a limitação sem afirmar que a auditoria passou.
5. Relate as rotas verificadas, alterações feitas e resultado dos comandos.
