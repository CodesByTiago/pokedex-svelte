# Épico: Adicionar um indicador visual à comparação

## Status

Concluído

## Contexto

O PRD já prevê comparar dois Pokémon lado a lado ([US06](../../prd.md) e [RF07](../../prd.md)). Este épico aprimora a apresentação visual da comparação existente.

## Objetivo

Deixar evidente que os dois Pokémon exibidos estão sendo comparados, adicionando um indicador “VS” entre suas imagens.

## Escopo

### Incluído

- Exibir um marcador visual “VS” entre as imagens dos dois Pokémon na página de comparação.
- Manter o marcador perceptível e a composição compreensível em telas estreitas e largas.
- Fornecer um nome acessível ou garantir que o marcador seja tratado como decorativo quando o contexto já comunicar a comparação.

### Fora do escopo

- Alterar os dados, atributos ou regras de seleção dos Pokémon comparados.
- Redesenhar outras partes da página de comparação.

## Critérios de conclusão

- O marcador “VS” aparece entre as imagens dos dois Pokémon na página de comparação.
- O marcador não encobre as imagens e permanece bem posicionado em telas estreitas e largas.
- A apresentação continua compreensível para usuários de tecnologia assistiva.
- A mudança tem cobertura de testes adequada e passa pela verificação de QA do projeto.

## Tarefas

- [x] **Definir e preparar o marcador “VS”:** confirmar o tratamento visual e criar ou adaptar o SVG necessário para exibir o indicador.
- [x] **Integrar o marcador à comparação:** posicioná-lo entre as imagens sem alterar o restante do fluxo de comparação.
- [x] **Adicionar ou atualizar testes:** validar a presença e a apresentação esperada do marcador.
- [x] **Verificar responsividade e acessibilidade em QA:** revisar o posicionamento em diferentes larguras e o comportamento para tecnologia assistiva.
