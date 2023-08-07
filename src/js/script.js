const fases = [
    {
      pergunta: 'Qual das seguintes linguagens de programação é conhecida por ser usada para criar páginas web interativas?',
      opcoes: ['Java', 'C++', 'HTML', 'Python'],
      respostaCorreta: 'a',
      imagem: '../assets/FASE 1.png'
    },
    {
      pergunta: 'Qual é o animal terrestre mais rápido?',
      opcoes: ['Guepardo', 'Leão', 'Elefante', 'Rinoceronte'],
      respostaCorreta: 'a',
      imagem: 'guepardo.jpg'
    },
    {
      pergunta: 'Qual é o país com a maior população do mundo?',
      opcoes: ['Índia', 'China', 'Estados Unidos', 'Rússia'],
      respostaCorreta: 'b',
      imagem: 'china.jpg'
    }
  ];
  
  let faseAtual = 0;
  const elementoResultado = document.getElementById('resultado');
  const elementoPergunta = document.getElementById('container-pergunta');
  
  function iniciarQuiz() {
    document.querySelector('.historia').style.display = 'none';
    elementoPergunta.style.display = 'block';
    mostrarFase();
  }
  
  function mostrarFase() {
    const fase = fases[faseAtual];
    elementoPergunta.innerHTML = '';
  
    const tituloPergunta = document.createElement('h2');
    tituloPergunta.textContent = `Fase ${faseAtual + 1}:`;
  
    const textoPergunta = document.createElement('p');
    textoPergunta.textContent = fase.pergunta;
  
    const imagemPergunta = document.createElement('img');
    imagemPergunta.className = 'imagem-pergunta';
    imagemPergunta.src = fase.imagem;
    imagemPergunta.alt = `Fase ${faseAtual + 1}`;
  
    const containerOpcoes = document.createElement('div');
    containerOpcoes.className = 'opcoes';
  
    const opcoes = ['a', 'b', 'c', 'd'];
    opcoes.forEach(opcao => {
      const botao = document.createElement('button');
      botao.textContent = `${opcao.toUpperCase()}) ${fase.opcoes[opcoes.indexOf(opcao)]}`;
      botao.value = opcao;
      botao.onclick = verificarResposta;
      containerOpcoes.appendChild(botao);
    });
  
    elementoPergunta.appendChild(tituloPergunta);
    elementoPergunta.appendChild(textoPergunta);
    elementoPergunta.appendChild(imagemPergunta);
    elementoPergunta.appendChild(containerOpcoes);
  }
  
  function verificarResposta(evento) {
    const opcaoSelecionada = evento.target;
    if (opcaoSelecionada.value === fases[faseAtual].respostaCorreta) {
      elementoResultado.textContent = `Resposta correta! Avançando para a próxima fase...`;
      faseAtual++;
      if (faseAtual < fases.length) {
        setTimeout(() => {
          mostrarFase();
        }, 2000);
      } else {
        elementoResultado.textContent = `Parabéns! Você completou todas as fases do quiz.`;
      }
    } else {
      elementoResultado.textContent = `Resposta incorreta. Você perdeu. Reiniciando o quiz...`;
      setTimeout(() => {
        reiniciarQuiz();
      }, 3000);
    }
  }
  
  function reiniciarQuiz() {
    faseAtual = 0;
    elementoResultado.textContent = '';
    mostrarFase();
  }
  