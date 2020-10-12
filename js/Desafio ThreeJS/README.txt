Olá Matheus obrigado pela mensagem. Vejo que se você se interessa por programação voltada a ambiente gráfico e tem também formação no CTW em mecânica, desenho técnico, projeto, acho que pode, se tiver conhecimento mais aprofundado em uma ferramenta gráfica de manipulação 3D para WEB tipo ThreeJS pode ter alguma oportunidade aqui mais para frente. Claro que gostaríamos de entender porque você como ex-aluno do CTW não ficou na WEG, mas depois conversamos isto.

Eu te proporia um desafio de estudo:
Fazer:

1. Um ambiente gráfico em uma Scene com um Canvas (como chamados no ThreeJS);

2. Que possa ler um arquivo gráfico do tipo .STL e .OBJ. (típicos de exportação de CAD 3D como SolidWorks), visualizar e manipular via mouse em orbit (giro, zoom) e pan (posicionamento), de forma dinâmica no mouse na tela deste ambiente gráfico.

3. Neste ambiente gráfico ler outro arquivo qualquer (xml por exemplo) com coordenadas espaciais de posicionamento de objetos de referência selecionáveis que serão criados adicionalmente ao item 2  (tipo um box ou sphere padrão do threeJS) que não sejam sensíveis ao zoom, isto é, independente da aproximação, estes objetos selecionáveis permanecem com a mesma dimensão sempre.

4. Permitir seleção por mouse destes objetos selecionáveis - inclusive em momentos de sobreposição de vários objetos selecionáveis, típicos de um zoom muito afastado

5. Ao selecionar o objeto mostrar um apanhado de valores texto contidas no mesmo arquivo xml que se referem a este objeto selecionado... em duas condições a e b diferentes a partir de uma configuração (option_buttom):

    a) Estes labels, lidos do conteudo texto do arquivo xml, devem aparecer orientados sempre de frente ao Canvas, permitindo sempre uma leitura nítida, independentemente da posição zoom ou orbit que se impõem ao canvas;
    b) E na outra opção, estes labels devem perecer sensíveis a posição de visão, orbit , zoom e pan, podendo ser até visto de trás
 
Alguns exemplo de inspiração para os pontos citados: 

(2) importação e visão arquivos do tipo .STL e .OBJ
https://www.youtube.com/watch?v=wHuSQ7I1aKs
https://threejs.org/examples/webgl_loader_stl.html

(2) pan, zoom orbit
https://threejs.org/examples/misc_controls_orbit.html
pan (botão da direita), zoom (trackboll/wheel) e Pan (botão da esquerda) 

(3) seleção, pick
https://threejsfundamentals.org/threejs/lessons/threejs-picking.html 

(5) manipulação de textos no canvas
https://threejsfundamentals.org/threejs/lessons/threejs-align-html-elements-to-3d.html 

5.a
https://cloud.withgoogle.com/infrastructure/explore/step-1

5.b
https://threejs.org/examples/#webgl_loader_lwo 

Se estudar isto já é um bom começo e uma boa “criação” de músculo para a briga!

Um abraço.

Carlos Grillo
Diretor de Negócios Digitais (CDO)
WEG Automação / Corporativo
Fone: +55 (47) 3276-4545
www.weg.net



----------------------------------------

If you want to have objects not move in regards to a camera movement, the best approach would be to create a difference scene and camera for those objects and render them on top.


 // in the animation loop
  renderer.render( scene, camera ) // regular scene, with orbit controls
  renderer.render( scene2, camera2 ) // special scene, with fixed camera