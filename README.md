# ❌⭕ Jogo da Velha

Jogo da velha em HTML, CSS e JavaScript puro, com IA minimax imbatível no modo Impossível. Sem dependências, sem build.

**Jogar online:** https://condedeveloper.github.io/jogo-da-velha/

## Rodar local

```bash
npx serve -l 5189 .
```

## Modos

| Modo        | Como a CPU joga                                   |
|-------------|---------------------------------------------------|
| Fácil       | Só acerta a melhor jogada 20% das vezes           |
| Médio       | Acerta 75% das vezes                              |
| Impossível  | Minimax completo: no máximo você empata           |
| 2 Jogadores | Dois humanos alternando no mesmo teclado ou tela  |

## Controles

- Clique ou toque na célula
- Teclas `1` a `9` marcam as células (1 = canto superior esquerdo)
- `N` começa uma nova rodada

## Funcionalidades

- Minimax com profundidade: prefere vencer rápido e perder devagar
- Sorteio entre jogadas igualmente boas, para as partidas não se repetirem
- Quem começa alterna a cada rodada
- Linha animada em SVG sobre a trinca vencedora
- Placar persistente no `localStorage` (vitórias, empates)
- Sons via WebAudio

## Estrutura

```
js/config.js   # trincas, modos e constantes
js/board.js    # estado e detecção de vitória
js/ai.js       # minimax e escolha por dificuldade
js/render.js   # DOM e linha vencedora
js/audio.js    # sons
js/game.js     # turnos, placar e modos
```

## Licença

MIT
