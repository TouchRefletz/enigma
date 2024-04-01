var enigma = document.getElementById('enigma');
var nivel = document.querySelector('.main__titulo');
var pergunta = document.querySelector('.main__pergunta');
var opcoes = document.querySelectorAll('.main__botao');
var div_botoes = document.querySelector('.main__div-botoes');
var opcao1 = document.getElementById('opcao-1');
var opcao2 = document.getElementById('opcao-2');
var opcao3 = document.getElementById('opcao-3');
var opcao4 = document.getElementById('opcao-4');
var div_input = document.createElement('div');
var div_tudo = document.createElement('div');
var nivelAtual = 1;
var eventListeners = [];
var erro = false;
var comecou = false;
var acabou = false;
var config = false;
var cores = false;
var input = document.createElement('input');
var i = 0;
var pontuacao = 0;
var perguntas = [
    'Qual foi, por muito tempo, o meu jogo favorito?',
    'Quantos anos eu tenho?',
    'Qual foi, por muito tempo, meu outro hobby, além de programar?',
    'Onde eu moro?',
    'Qual é o nome da minha playlist no Spotify?'
];
var respostas = [
    'Fortnite, Roblox, Minecraft, Subway Surfers',
    '13, 14, 15, 16',
    'Editor de Vídeo, Músico, Jogador de futebol, Ator',
    'Ribeirão Pires, Mauá, Ribeirão Preto, Osasco',
    'ToqueReflexo, um toque musical, um TOQUE musical, um TOQUE musical.'
]
var respostasCertas = [
    1,
    2,
    1,
    1,
    4
]

function reiniciarVariaveisDeControle() {
    i = 0;
    nivelAtual = 1;
    comecou = false;
    acabou = false;
    pontuacao = 0;
    enigma.style.opacity = '1';
}

function addEventListenerComHistorico(elemento, tipoDeEvento, funcao) {
    elemento.addEventListener(tipoDeEvento, funcao);
    eventListeners.push({ elemento, tipoDeEvento, funcao});
}

function removerTodososEventListeners() {
    eventListeners.forEach(({ elemento, tipoDeEvento, funcao }) => {
       elemento.removeEventListener(tipoDeEvento, funcao);
   });
   eventListeners = [];
}

function resetCSSNoHTML() {
    nivel.style.cssText = '';
    pergunta.style.cssText = '';
    opcoes.forEach(function(opcao) {
        opcao.style.cssText = '';
    });
}

function nomearTitulo(nome) {
    nivel.textContent = nome;
}

function nomearBotoes(nomes) {
    opcoes = document.querySelectorAll('.main__botao');
    var nomesDosBotoes = nomes.split(', ');
    for (var i = 0; i < nomesDosBotoes.length; i++) {
        if (opcoes[i]) {
            opcoes[i].innerHTML = nomesDosBotoes[i];
        } else {
            console.error("Não há botão suficiente para o nome", nomesDosBotoes[i]);
        }
    }
}

function criarBotoes(quantidade, nomes) {
    var nomesDosBotoes = nomes.split(', ');
    for (var i = 0; i < quantidade; i++) {
        var botaoCriado = document.createElement('button');
        botaoCriado.classList.add('main__botao');
        div_botoes.appendChild(botaoCriado);
        botaoCriado.id = nomesDosBotoes[i];
    }
}

function limparParagrafo() {
    pergunta.textContent = '';
}

function criarInput() {
    div_input.classList.add('div_input');
    div_tudo.appendChild(div_input);
}

function criarDivTudo() {
    div_tudo.classList.add('div_tudo');
    input.type = 'color';
    input.classList.add('input');
    div_input.appendChild(input);
    enigma.appendChild(div_tudo);
}

function colocarBotoesNaDivTudo() {
    div_tudo.appendChild(div_botoes);
}

function puxarInput() {
    input.style.animation = 'real-fade-in 1s ease-in-out';
    setTimeout(() => {
        input.style.opacity = '1';
    }, 1000);
}

function definirCorDeFundo() {
    var corSelecionada = document.querySelector('.input').value;
    document.documentElement.style.setProperty('--cor-de-fundo', corSelecionada);
  }  

function definirCorDosTextos() {
   var corSelecionada = document.querySelector('.input').value;
   document.documentElement.style.setProperty('--cor-do-texto', corSelecionada);
 }   

function definirCorDosBotoes() {
    var corSelecionada = document.querySelector('.input').value;
    document.documentElement.style.setProperty('--cor-secundaria', corSelecionada);
}   

function definirCorDosBotoesNoHover() {
    var corSelecionada = document.querySelector('.input').value;
    document.documentElement.style.setProperty('--cor-terciaria', corSelecionada);
}  


function desfazerDivsDasCores() {
    enigma.style.opacity = '0';
    div_botoes.removeChild(opcao5);
    enigma.appendChild(div_botoes);
    enigma.removeChild(div_tudo);
}

function removerInput() {
    input.style.animation = 'saida-texto 1s ease-in-out';
    setTimeout(() => {
        input.style.opacity = '0';
    }, 1000);
}

function resetarBotoes() {
    if (cores == true) {
        return;
    } else {
        opcoes.forEach(botao => {
            botao.style.backgroundColor = 'var(--cor-secundaria)';
        });
    }
}

function destacarBotaoClicado(botao) {
    var botaoClicado = botao;
    if (cores == true) {
        addEventListenerComHistorico(botaoClicado, 'mouseenter', function () {
            botaoClicado.style.backgroundColor = 'var(--cor-terciaria)';
        });
        addEventListenerComHistorico(botaoClicado, 'mouseleave', function () {
            botaoClicado.style.backgroundColor = 'var(--cor-secundaria)';
        });
    }
    else if (cores == false) {
        botaoClicado.style.backgroundColor = 'var(--cor-principal)';
        setTimeout(() => {
            botaoClicado.style.backgroundColor = 'var(--cor-secundaria)';
        }, 1000);
    } else if (erro == true) {
        botaoClicado.style.backgroundColor = 'var(--cor-vermelha)';
        return;
    } else {
        return;
    }
}

function puxarBotoes() {
    opcoes.forEach(function (botao, index) {
        setTimeout(function () {
            botao.style.animation = 'entrada 1s ease-in-out';
            botao.style.opacity = '1';
        }, 250 * index);
    });
}

function comecarEnigma(botao) {
    destacarBotaoClicado(botao);
    setTimeout(() => {
        sairPergunta();
        setTimeout(() => {
            reiniciarVariaveisDeControle();
        }, 1500);
    }, 1500);
}


habilitarMenuPrincipal();

function habilitarMenuPrincipal() {
    reiniciarVariaveisDeControle();
    removerTodososEventListeners();
    resetCSSNoHTML();
    config = false;
    nomearTitulo('Enigma');
    limparParagrafo();
    nomearBotoes('Jogar, Configurações, Versões, Feedback');
    addEventListenerComHistorico(opcao1, 'click', function () {
        comecarEnigma(opcao1);
    });
    addEventListenerComHistorico(opcao2, 'click', configuracoes);
    puxarBotoes();
}

function enviarSinal() {
    comecou = true;
}

function configuracoes() {
    removerTodososEventListeners();
    config = true;
    setTimeout (function () {
    reiniciarVariaveisDeControle();
    resetCSSNoHTML();
    nomearTitulo('Configurações');
    limparParagrafo();
    nomearBotoes('Mudar cores, Remover animações, n sei, Voltar ao menu principal');
    addEventListenerComHistorico(opcao1, 'click', irParaMenuMudarCores);
    addEventListenerComHistorico(opcao4, 'click', voltarAoMenuPrincipal);
    puxarBotoes();
    }, 4000);
}

function irParaMenuMudarCores() {
    removerTodososEventListeners();
    setTimeout (function () {
        cores = true;
        criarInput();
        criarDivTudo();
        colocarBotoesNaDivTudo();
        resetCSSNoHTML();
        nomearTitulo('Mudar cores');
        limparParagrafo();
        criarBotoes(1, 'opcao5');
        nomearBotoes('Mudar cor de fundo, Mudar cor dos textos, Mudar cor dos botões, Mudar cor dos botões no hover, Voltar ao menu principal');
        addEventListenerComHistorico(opcao1, 'click', definirCorDeFundo);
        addEventListenerComHistorico(opcao2, 'click', definirCorDosTextos);
        addEventListenerComHistorico(opcao3, 'click', definirCorDosBotoes);
        addEventListenerComHistorico(opcao4, 'click', definirCorDosBotoesNoHover);
        addEventListenerComHistorico(opcao5, 'click', voltarAoMenuPrincipal);
        puxarBotoes();
        puxarInput();
    }, 4000);
}

function voltarAoMenuPrincipal() {
    setTimeout(function () {
        acabou = true;
        sairPergunta();
        removerInput();
        setTimeout(() => {
            desfazerDivsDasCores();
        }, 2500);
        setTimeout(function () {
            habilitarMenuPrincipal();
        }, 3000)
    }, 1500)
}

function resetarPerguntas() {
    pergunta.innerHTML = perguntas[i];
    nomearTitulo(`Nível ${nivelAtual}`);
    nomearBotoes(respostas[i]);
}

function mostrarParagrafo() {
    var perguntaTexto = pergunta.textContent;
    var animacaoPergunta = perguntaTexto.split(' ');
    limparParagrafo();
    setTimeout(function () {
        for (var i = 0; i < animacaoPergunta.length; i++) {
            (function(i) {
                var span = document.createElement('span');
                span.textContent = animacaoPergunta[i] + ' ';
                span.style.transition = 'all 1s ease-in-out';
                span.classList.add('main__pergunta');
                span.style.opacity = '0';
                span.style.animation = 'fade-in 0.3s ease-in-out';
                setTimeout(function () {
                    span.style.opacity = '1';
                    pergunta.appendChild(span);
                }, 200 * i);
            })(i);
        }
        setTimeout(function() {
            puxarBotoes();
        }, 200 * animacaoPergunta.length);
    }, 500)
}

function entrarPergunta() {
    if (i >= perguntas.length) {
        mostrarTelaFinal();
    } else if ((acabou) || (config)) {
        return;
    }
    removerTodososEventListeners();
    resetarPerguntas();
    mostrarTituloEParagrafo();
    mostrarParagrafo();
    criarEventoParaOpcao(opcao1, 1);
    criarEventoParaOpcao(opcao2, 2);
    criarEventoParaOpcao(opcao3, 3);
    criarEventoParaOpcao(opcao4, 4);
}

function retirarBotoes() {
    opcoes.forEach(function (botao, index) {
        setTimeout(function () {
            botao.style.animation = 'saida 1s ease-in-out';
            botao.style.opacity = '0';
        }, 250 * index);
    });
}

function retirarTituloEParagrafo() {
    setTimeout(function () {
        nivel.style.animation = 'saida-texto 1s ease-in-out';
        pergunta.style.animation = 'saida-texto 1s ease-in-out';
        setTimeout(function () {
            pergunta.style.opacity = '0';
            nivel.style.opacity = '0';
        }, 500);
        }, 500);
}

function mostrarTituloEParagrafo() {
    setTimeout(function () {
        nivel.style.animation = 'entrada-texto 1s ease-in-out';
        pergunta.style.animation = 'entrada-texto 1s ease-in-out';
        setTimeout(function () {
            pergunta.style.opacity = '1';
            nivel.style.opacity = '1';
        }, 500);
        }, 500);
}

function mostrarTelaFinal() {
    pergunta.innerHTML = `Você respondeu todas as perguntas corretamente. Sua pontuação foi de ${pontuacao}.`;
    mostrarParagrafo();
    nomearTitulo('Parabéns!');
    mostrarTituloEParagrafo();
    nomearBotoes('Voltar ao menu, Escolher outra versão, Configurações, Feedback');
    addEventListenerComHistorico(opcao1, 'click', habilitarMenuPrincipal);
    addEventListenerComHistorico(opcao3, 'click', configuracoes);
}

function avancarNivel() {
    if (comecou) {
        nivelAtual++;
        i++;
        pontuacao++; 
    } else {
        return;
    }
}

function sairPergunta() {
    if (cores) {
        return;
    }
    retirarTituloEParagrafo();
    retirarBotoes();
        setTimeout(function () {
            setTimeout(function () {
                resetarPerguntas();
                if (comecou == false)  {
                    enviarSinal();
                    entrarPergunta();
                } else {
                    return;
                }
                avancarNivel();
                setTimeout(function () {
                    if (i >= perguntas.length) {
                        mostrarTelaFinal();
                        return;
                    } else {
                        entrarPergunta();
                    }
                }, 500);    
            }, 500);
        }, 1500);
}

function alternativaErrada(botao) {
    erro = true;
    botao.style.backgroundColor = 'var(--cor-vermelha)';
    pontuacao--;
}

function criarEventoParaOpcao(botao, indice) {
    botao.addEventListener('click', function () {
            if ((respostasCertas[i] == indice) || (comecou == false)) {
                erro = false;
                destacarBotaoClicado(botao);
                setTimeout(function () {
                    sairPergunta();
                }, 1500)
                setTimeout(resetarBotoes, 1000);
            } else {
                alternativaErrada(botao);
            }
        }
    )};
