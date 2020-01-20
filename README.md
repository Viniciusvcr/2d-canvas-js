# 2d-canvas-js
Repositório usado no trabalho de Computação Gráfica - CC UEM 2019


# TODO

- [x] Desenhos
    - [x] Reta
    - [x] Triângulo
    - [x] Quadrado
    - [x] Circulo
    - [ ] Locar Eixos
    - [x] P. Criação
- [x] Seleção de Objetos
    - [x] Múltiplos Objetos
    - [x] Único Objeto
- [ ] Operações
    - [x] Clear
    - [x] Translação
    - [x] Escala
    - [x] Rotação
    - [ ] Zoom
        - [ ] Janela
        - [ ] Aspect Ratio
    - [x] Zoom Extent
        - [x] Centralizar
        - [x] Aspect Ratio
- [ ] IHC
    - [x] Feedback
    - [x] Cursor
    - [x] C. Cursor
    - [x] Dest. Sel
    - [ ] Ajuda
    - [x] Undo
    - [x] Redo
    - [ ] Linha de Comando
        - [x] Translação
        - [x] Escala
        - [x] Rotação
        - [ ] Zoom
        - [x] Zoom Extent
        - [x] Clear
        - [x] Undo
        - [x] Redo
        - [x] Reta
        - [x] Triângulo
        - [x] Quadrado
        - [x] Circulo


## Ajuda ao usuário

### Abrir o programa

- Para abrir o programa, basta abrir o arquivo "index.html" em seu navegador de preferência.
- Ao fazer isso, você já verá a interface principal do programa.
- Não é necessário instalar nenhum programa.

### Comandos

- Na interface principal, é possível ver o canvas de desenho, os botões de ferramentas e uma tabela de objetos presentes na tela.
    - Cada botão presente no programa conta com um atalho de teclado, citado entre parênteses. (Letras em maiúsculo representam shift + letra)

- Os comandos também estão disponíveis via linha de comando. Ela é acessível pelo próprio console do navegador
    - Abrir console no Google Chrome: Ctrl + Shift + j
    - Abrir console no Firefox: Ctrl + Shift + k

    - Uma lista das interfaces dos comandos será disponibilizada mais a frente.

### Seleção de objetos

- Para selecionar/deselecionar um ou vários objetos presentes no canvas, clique em uma linha da Tabela de Objetos.
- Quando selecionado, o objeto e sua linha da tabela ficarão vermelhos, representando que estão selecionados.

### Interfaces de comandos

|                   Comando                  |                                                                          Parâmetros                                                                          |                                                  Descrição                                                  |
|:------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------:|
| clearScreen()                              |                                                                               -                                                                              | Limpa a tela, destruindo todos os objetos                                                                   |
| undo()                                     |                                                                               -                                                                              | Desfaz a última ação feita pelo usuário                                                                     |
| redo()                                     |                                                                               -                                                                              | Refaz a última ação desfeita pelo usuário                                                                   |
| desenhar_triangulo(x1, y1, x2, y2, x3, y3) | x1: X do primeiro ponto<br>y1: Y do primeiro ponto<br>x2: X do segundo ponto<br>y2: Y do segundo ponto<br>x3: X do terceiro ponto<br>y3: Y do terceiro ponto | Desenha um triângulo com os três pontos disponibilizados                                                    |
| desenhar_circulo(x1, y1, x2, y2)           | x1: X do primeiro ponto<br>y1: Y do primeiro ponto<br>x2: X do segundo ponto<br>y2: Y do segundo ponto                                                       | Desenha um círculo com os dois pontos disponibilizados <br>(centro do círculo, borda do círculo)            |
| desenhar_reta(x1, y1, x2, y2)              | x1: X do primeiro ponto<br>y1: Y do primeiro ponto<br>x2: X do segundo ponto<br>y2: Y do segundo ponto                                                       | Desenha uma reta com os dois pontos disponibilizados                                                        |
| desenhar_retangulo(x1, y1, x2, y2)         | x1: X do primeiro ponto<br>y1: Y do primeiro ponto<br>x2: X do segundo ponto<br>y2: Y do segundo ponto                                                       | Desenha um retângulo com os dois pontos disponibilizados<br>(os pontos têm que ser a diagonal do retângulo) |
| transladar(x, y)                           | x: X do destino da translação<br>y: Y do destino da translação                                                                                               | Translada os objetos previamente selecionados para o ponto (x, y)                                           |
| escala(sx, sy)                             | sx: Escala em X<br>sy: Escala em Y                                                                                                                           | Faz uma operação de mudança de escala (sx, sy) nos objetos selecionados                                     |
| rotacao(theta, x, y)                       | theta: Ângulo (em graus) da rotação<br>x: X do ponto de referência da rotação<br>y: Y do ponto de referência da rotação                                      | Faz uma operação de rotação com theta graus, em torno do ponto (x, y)                                       |
