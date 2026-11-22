# Agent Instructions & Design System Routing

Este projeto utiliza o conjunto de skills de design **Craft** ([diego3g/craft](https://github.com/diego3g/craft)).
Antes de responder ou executar qualquer tarefa visual, de UI, telas, componentes ou design system, utilize o roteador abaixo.

## Tabela de Roteamento (Craft Skills)

| Situação | Skill a invocar |
|---|---|
| Qualquer pedido para desenhar, criar, prototipar ou redesenhar uma página, tela, fluxo ou elemento | `craft` |
| Tarefa de design em um projeto **sem `DESIGN.md`** na raiz | `craft-setup` primeiro (configura brief e sincroniza com o código), depois `craft` |
| "Configurar design", "definir estilo / marca / diretrizes", `/craft-setup` | `craft-setup` |
| "Opções", "alternativas", "outras direções", "repensar isso" | `craft-explore` |
| "Revisar", "refinar", "polir", "melhorar", "parece estranho", ou antes de exibir um design recém-feito | `craft-critique` |
| Tokens, style guide, criar/alterar componente, "padronizar", "auditar" | `craft-system` |
| Importar ou exportar tokens/componentes entre o código e ferramentas visuais | `craft-sync` |
| "Quais estados estão faltando?", "está pronto para dev?", cobrir todos os estados | `craft-states` |

## Regras Fundamentais do Craft

1. **`DESIGN.md` na raiz:** O arquivo `DESIGN.md` é a verdade do design brief do projeto. Se o código e o brief divergirem, o código vence temporariamente e o conflito é registrado em *Open questions*.
2. **Tokens primeiro:** Nenhuma cor, espaçamento ou raio solto no código ou em telas. Todas as propriedades visuais utilizam as variáveis/tokens definidos em `src/app/globals.css`.
3. **Matriz de Estados Completa:** Nenhuma tela é entregue apenas no "happy path". O `craft-states` cataloga estados vazios (empty), carregando (loading), erro (error), parcial, interação, etc.
4. **Auto-revisão obrigatória (`craft-critique`):** Antes de apresentar qualquer tela ao usuário, o agente deve rodar a checagem crítica e corrigir problemas de hierarquia, contraste, espaçamento e estabilidade.
5. **Decisões registradas:** Qualquer decisão tomada em uma sessão de design é adicionada ao *Decisions log* em `DESIGN.md`.
