# SEO e Lighthouse

## Objetivo

As páginas públicas da Pokédex devem ser rastreáveis, apresentar metadados relevantes e entregar seu conteúdo principal no HTML renderizado pelo servidor. O Lighthouse é usado para verificar os requisitos básicos de SEO.

## Requisitos

- Defina um `<title>` único e descritivo para cada rota pública.
- Inclua uma meta description específica, curta e coerente com o conteúdo da página.
- Preserve o SSR nas rotas de catálogo, comparação e detalhes para que o conteúdo principal e os metadados estejam disponíveis no HTML inicial.
- Use títulos semânticos, links com propósito compreensível e texto alternativo apropriado para imagens informativas. Imagens decorativas devem usar `alt=""`.
- Mantenha `robots.txt` coerente com as regras de rastreamento do produto.
- Não inclua informações que dependam de estado temporário do usuário nos metadados indexáveis.

Os metadados de cada página devem ser definidos em seu próprio arquivo `+page.svelte` usando `<svelte:head>`. Não mova metadados específicos de uma rota para o layout global.

## Auditoria Lighthouse

Execute o comando abaixo na raiz do projeto:

```sh
vp run seo
```

O comando cria um build de produção, inicia temporariamente o preview e executa Lighthouse CI para as versões **Mobile** e **Desktop** destas rotas:

- Catálogo: `/`
- Comparação: `/compare`
- Detalhes: `/pokemon/25`

As notas SEO de cada rota são exibidas no terminal. O comando termina com erro se alguma nota ficar abaixo de **90**. Os relatórios JSON e HTML ficam em `.lighthouseci/` por modo e não são enviados a serviços externos.

É necessário ter Google Chrome ou Chromium instalado. Se o navegador não for encontrado, configure a variável `CHROME_PATH` com o caminho do executável e rode novamente.

Para inspecionar um diagnóstico, abra o relatório HTML correspondente em `.lighthouseci/mobile/` ou `.lighthouseci/desktop/`. Use uma nova execução após alterações de conteúdo ou renderização.

## Verificação adicional

Além do score, inspecione o HTML recebido sem depender da execução de JavaScript e confirme:

- cada página contém um título e uma meta description próprios;
- o conteúdo principal e os headings aparecem no HTML inicial;
- links de navegação são elementos `<a>` com destinos válidos;
- imagens informativas têm texto alternativo;
- o `robots.txt` não bloqueia as páginas públicas.

Um score Lighthouse alto não substitui a validação de conteúdo, acessibilidade, indexabilidade ou resultados em mecanismos de busca. Não altere regras de rastreamento para melhorar a pontuação sem confirmar a intenção do produto.
