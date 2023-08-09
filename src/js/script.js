const fases = [
  {
    pergunta: 'Qual tag HTML é usada para criar um link no HTML?',
    opcoes: ['<link>', '<a>', '<h1>', '<img>'],
    respostaCorreta: 'b',
    imagem: 'assets/fase1.gif'
  },
  {
    pergunta: 'Qual propriedade devemos utilizar para alterar a cor de um texto no CSS?',
    opcoes: ['color', 'font:color', 'text:color', 'text-font:color'],
    respostaCorreta: 'a',
    imagem: 'assets/fase2.gif'
  },
  {
    pergunta: 'Como se declara uma função em JavaScript?',
    opcoes: ['function{}', 'var()', 'set[]', 'fuction()'],
    respostaCorreta: 'd',
    imagem: 'assets/FASE 3.png'
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
      elementoResultado.textContent = `Parabéns! Você completou todas as fases do quiz e ajudou Joshua a escapar do mundo virtual!.`;
      const imagemFinal = document.createElement('div');
      imagemFinal.className = 'imagem-final';
      elementoResultado.appendChild(imagemFinal);
      
      // Esconde a parte das perguntas e fases do quiz
      elementoPergunta.style.display = 'none';
    }
  } else {
    elementoResultado.textContent = `Resposta incorreta. Você perdeu. Reiniciando o quiz...`;
    setTimeout(() => {
      reiniciarQuiz();
    }, 2000);
  }
}
