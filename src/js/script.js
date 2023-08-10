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
    imagem: 'assets/fase3.gif'
  }
];

let faseAtual = 0;
let quizAtivo = false;
let mostrandoTelaDeDerrota = false;
const elementoResultado = document.getElementById('resultado');
const elementoPergunta = document.getElementById('container-pergunta');
const elementoHistoria = document.querySelector('.historia');
const elementoContainerQuiz = document.querySelector('.quiz-container');
const elementoLogo = document.querySelector('.logo');

function iniciarQuiz() {
  elementoHistoria.style.display = 'none';
  elementoPergunta.style.display = 'block';
  elementoResultado.innerHTML = '';
  mostrandoTelaDeDerrota = false;
  quizAtivo = true;
  elementoContainerQuiz.classList.add('quiz-iniciado');
  elementoLogo.classList.remove('no-quiz');
  mostrarFase();
}

function mostrarFase() {
  if (!quizAtivo) return;

  const fase = fases[faseAtual];
  elementoPergunta.innerHTML = '';

  const imagemPergunta = document.createElement('img');
  imagemPergunta.className = 'imagem-pergunta';
  imagemPergunta.src = fase.imagem;
  imagemPergunta.alt = `Fase ${faseAtual + 1}`;

  elementoPergunta.appendChild(imagemPergunta);

  const tituloPergunta = document.createElement('h2');
  tituloPergunta.textContent = `Fase ${faseAtual + 1}:`;
  elementoPergunta.appendChild(tituloPergunta);

  const textoPergunta = document.createElement('p');
  textoPergunta.textContent = fase.pergunta;
  elementoPergunta.appendChild(textoPergunta);

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

  elementoPergunta.appendChild(imagemPergunta);
  elementoPergunta.appendChild(tituloPergunta);
  elementoPergunta.appendChild(textoPergunta);
  elementoPergunta.appendChild(containerOpcoes);
}

function verificarResposta(evento) {
  if (!quizAtivo) return;

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
      const imagemFinal = new Image();
      imagemFinal.src = 'assets/vitoria.gif';
      imagemFinal.className = 'imagem-final';
      elementoResultado.appendChild(imagemFinal);
      elementoPergunta.style.display = 'none';
      quizAtivo = true;
      setTimeout(() => {
        voltarParaTelaInicial();
      }, 18000);
    }
  } else {
    elementoResultado.innerHTML = 'Você perdeu! Tente novamente, não deixe Joshua agora!';
    const imagemGameOver = new Image();
    imagemGameOver.src = 'assets/morte.gif';
    imagemGameOver.className = 'imagem-game-over';
    elementoResultado.appendChild(imagemGameOver);
    elementoPergunta.style.display = 'none';
    mostrandoTelaDeDerrota = true;
    setTimeout(() => {
      voltarParaTelaInicial();
    }, 11000);
  }
}

function voltarParaTelaInicial() {
  if (mostrandoTelaDeDerrota) {
    elementoResultado.innerHTML = '';
    mostrandoTelaDeDerrota = false;
  }else if(quizAtivo){
    elementoResultado.innerHTML = '';
    quizAtivo = false
  }
  faseAtual = 0;
  elementoPergunta.style.display = 'flex';
  elementoPergunta.style.display = 'none';
  quizAtivo = false;
}

voltarParaTelaInicial()
